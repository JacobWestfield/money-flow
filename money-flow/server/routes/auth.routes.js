const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const TokenService = require("../services/token.service");

//Добавил валидацию поля Имя из формы с фронта
router.post("/signUp", [
  check("email", "Incorrect email").exists().trim().isEmail(),
  check("password", "Password length have to be 8 symbols")
    .exists()
    .trim()
    .isLength({
      min: 8,
    }),
  check("name", "Name is required").trim().exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }

      const { email, password, name } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        email: email,
        password: hashedPassword,
        name: name,
      });
      const tokens = TokenService.generate({ _id: newUser._id });
      await TokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({
        ...tokens,
        userId: newUser._id,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error occured. Try later",
      });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "Incorrect email").exists().trim().isEmail(),
  check("password", "Password length have to be 8 symbols")
    .exists()
    .trim()
    .isLength({
      min: 8,
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_NOT_FOUND",
          },
        });
      }

      const passwordsAreEqual = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordsAreEqual) {
        return res.status(400).json({
          error: {
            message: "INVALID_PASSWORD",
          },
        });
      }
      const tokens = TokenService.generate({ _id: existingUser._id });
      await TokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({
        ...tokens,
        userId: existingUser._id,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error occured. Try later",
      });
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = TokenService.validateRefreshToken(refreshToken);
    const dbToken = await TokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const tokens = await TokenService.generate({
      _id: dbToken.user.toString(),
    });
    await TokenService.save({
      _id: data._id,
    });

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({
      message: "Server error occured. Try later",
    });
  }
});

module.exports = router;
