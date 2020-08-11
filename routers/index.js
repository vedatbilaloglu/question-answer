
const express = require("express");

const questions = require("./questions");
const auth = require("./auth");
const user = require("./user");
const admin = require("./admin");
//  /api
const router = express.Router();

router.use("/questions",questions);  // Buradan  /api/questions şeklinde yönlendirmeyi alir.
router.use("/auth",auth); // Buradan  /api/auth şeklinde yönlendirmeyi alir.
router.use("/user",user);
router.use("/admin", admin);

module.exports = router;