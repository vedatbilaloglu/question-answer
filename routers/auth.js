
const express = require("express");
const { register, errorTest } = require('../controllers/auth'); // controllers altındaki auth.js'i dahil ederek router işlemlerini kolaylaştırdım.
// api/auth
const router = express.Router();

router.post("/register",register); // controllers/auth.js'dan gelen register, /register yönlendirmesinde çalışır.
router.get("/error", errorTest);

module.exports = router;