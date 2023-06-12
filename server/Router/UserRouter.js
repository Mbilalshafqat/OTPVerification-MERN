const express = require("express");
const router = express.Router();
const controller = require("../contreoller/UserController");

router.post("/otpVerification", controller.CreateUser);

router.post("/CreateUser", controller.createUserAfterOPT);

router.post("/login", controller.loginUser);

module.exports = router;
