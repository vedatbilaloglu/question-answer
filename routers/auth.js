
const express = require("express");
const { register, login , getUser, logout } = require('../controllers/auth'); // controllers altındaki auth.js'i dahil ederek router işlemlerini kolaylaştırdım.
const {getAccessToRoute} = require("../middlewares/authorization/auth"); 

// api/auth
const router = express.Router();

router.post("/register",register); // controllers/auth.js'dan gelen register, /register yönlendirmesinde çalışır.
router.post("/login", login);
router.get("/profile",getAccessToRoute,getUser);
router.get("/logout", getAccessToRoute, logout);
module.exports = router;