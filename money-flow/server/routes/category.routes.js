const express = require("express");
const { check, validationResult } = require("express-validator");
const Category = require("../models/Category");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth.middleware");

router.delete("/:categoryId", authMiddleware, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const user = await req.user;
    const category = await Category.findById(categoryId);
    if (category.userId.toString() === user._id) {
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
      res.status(200).send({ data: deletedCategory });
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

router.post("/createCategory", authMiddleware, [
  check("name", "Name is required").trim().exists().notEmpty(),
  check("type", "Type is required").trim().exists().notEmpty(),
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

      const user = await req.user;
      const { name, type } = req.body;

      const newCategory = await Category.create({
        type: type,
        name: name,
        userId: user._id,
      });

      res.status(201).send({ data: newCategory });
    } catch (error) {
      res.status(500).json({
        message: "Server error occured. Try later",
      });
    }
  },
]);

router.patch("/:categoryId", authMiddleware, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const user = await req.user;
    const category = await Category.findById(categoryId);
    if (category.userId.toString() === user._id) {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).send({ data: updatedCategory });
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

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await req.user;
    const categories = await Category.find({ userId: user._id });
    console.log(user);
    res.send({ data: categories });
  } catch (error) {
    res.status(500).json({
      message: "Server error occured. Try later",
    });
  }
});

module.exports = router;
