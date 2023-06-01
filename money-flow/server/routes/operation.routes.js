const express = require("express");
const { check, validationResult } = require("express-validator");
const Operation = require("../models/Operation");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth.middleware");

router.delete("/:operationId", authMiddleware, async (req, res) => {
  try {
    const { operationId } = req.params;
    const user = await req.user;
    console.log(user, operationId);
    const operation = await Operation.findById(operationId);
    console.log(operation.userId.toString() === user._id);
    if (operation.userId.toString()) {
      const deletedOperation = await Operation.findByIdAndDelete(operationId);
      res.status(200).send({ data: deletedOperation });
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

router.post("/createOperation", authMiddleware, [
  check("name", "Name is required").trim().exists().notEmpty(),
  check("commentary", "Commentary is required").trim().exists().notEmpty(),
  check("value", "Value is required").trim().exists().notEmpty(),
  check("bill", "Bill is required").trim().exists().notEmpty(),
  check("category", "Category is required").trim().exists().notEmpty(),
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
      const { name, commentary, value, bill, category } = req.body;
      const newOperation = await Operation.create({
        name,
        commentary,
        value,
        bill,
        category,
        userId: user._id,
      });

      res.status(201).send({ data: newOperation });
    } catch (error) {
      res.status(500).json({
        message: "Server error occured. Try later",
      });
    }
  },
]);

router.patch("/:operationId", authMiddleware, async (req, res) => {
  try {
    const { operationId } = req.params;
    const user = await req.user;
    const operation = await Operation.findById(operationId);
    if (operation.userId.toString() === user._id) {
      const updatedOperation = await Operation.findByIdAndUpdate(
        operationId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).send({ data: updatedOperation });
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
    const operations = await Operation.find({ userId: user._id });
    console.log(user);
    res.send({ data: operations });
  } catch (error) {
    res.status(500).json({
      message: "Server error occured. Try later",
    });
  }
});

module.exports = router;
