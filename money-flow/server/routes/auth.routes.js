const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/signUp", (req, res) => {});
router.post("/signInWithPassword", (req, res) => {});
router.post("/token", (req, res) => {});

module.exports = router;
