const express = require("express");
const { check, validationResult } = require("express-validator");
const Bill = require("../models/Bill");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth.middleware");

router.delete("/:billId", authMiddleware, async (req, res) => {
  try {
    const { billId } = req.params;
    console.log(billId);
    const user = await req.user;
    console.log(user);
    const bill = await Bill.findById(billId);
    if (bill.userId.toString() === user._id) {
      const deletedBill = await Bill.findByIdAndDelete(billId);
      res.status(200).send({ data: deletedBill });
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

router.post("/createBill", authMiddleware, [
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

      const newBill = await Bill.create({
        type: type,
        name: name,
        userId: user._id,
      });

      res.status(201).send({ data: newBill });
    } catch (error) {
      res.status(500).json({
        message: "Server error occured. Try later",
      });
    }
  },
]);

router.patch("/:billId", authMiddleware, async (req, res) => {
  try {
    const { billId } = req.params;
    const user = await req.user;
    const bill = await Bill.findById(billId);
    if (bill.userId.toString() === user._id) {
      const updatedBill = await Bill.findByIdAndUpdate(billId, req.body, {
        new: true,
      });
      res.status(200).send({ data: updatedBill });
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
    const bills = await Bill.find({ userId: user._id });
    console.log(user);
    res.send({ data: bills });
  } catch (error) {
    res.status(500).json({
      message: "Server error occured. Try later",
    });
  }
});

module.exports = router;
