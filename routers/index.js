
const express = require("express");
const questions = require("./questions");
const auth = require("./auth");
//  /api
const router = express.Router();

router.use("/questions",questions);
router.use("/auth",auth);

module.exports = router;