const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const TokenService = require("../srevices/token.service");
const tokenService = require("../srevices/token.service");

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
      await tokenService.save(newUser._id, tokens.refreshToken);

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
      await tokenService.save(existingUser._id, tokens.refreshToken);

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

router.post("/token", (req, res) => {});

module.exports = router;
