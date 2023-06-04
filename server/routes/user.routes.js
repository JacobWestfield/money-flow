const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth.middleware");

router.patch("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await req.user;
    if (userId === user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.status(200).send(updatedUser);
    } else {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error occured. Try later",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const usersList = await User.find();
    res.status(200).send(usersList);
  } catch (error) {
    res.status(500).json({
      message: "Server error occured. Try later",
    });
  }
});

module.exports = router;
