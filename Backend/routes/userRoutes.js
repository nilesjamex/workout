const express = require("express");

const User = require("../controllers/userController");

const { login, signup } = User;

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

module.exports = router;
