
const express = require("express");
const { register, tokentest } = require('../controllers/auth'); // controllers altındaki auth.js'i dahil ederek router işlemlerini kolaylaştırdım.
const {getAccessToRoute} = require("../middlewares/authorization/auth"); 

// api/auth
const router = express.Router();

router.post("/register",register); // controllers/auth.js'dan gelen register, /register yönlendirmesinde çalışır.
router.get("/tokentest",getAccessToRoute,tokentest);

module.exports = router;