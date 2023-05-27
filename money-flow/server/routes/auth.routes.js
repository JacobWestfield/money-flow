const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const TokenService = require("../srevices/token.service");
const tokenService = require("../srevices/token.service");

router.post("/signUp", async (req, res) => {
  try {
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
    console.log(hashedPassword);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
    console.log(newUser);
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
});
router.post("/signInWithPassword", (req, res) => {});
router.post("/token", (req, res) => {});

module.exports = router;
