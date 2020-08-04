
const express = require("express");
const questions = require("./questions");
const auth = require("./auth");
//  /api
const router = express.Router();

router.use("/questions",questions);  // Buradan  /api/questions şeklinde yönlendirmeyi alir.
router.use("/auth",auth); // Buradan  /api/auth şeklinde yönlendirmeyi alir.

module.exports = router;