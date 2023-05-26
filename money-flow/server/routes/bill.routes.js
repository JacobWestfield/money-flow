const express = require("express");
const Bill = require("../models/Bill");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.send(bills);
  } catch (error) {
    res.status(500).json({
      message: "Server error occured. Try later",
    });
  }
});

module.exports = router;
