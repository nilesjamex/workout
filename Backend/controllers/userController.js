const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //   create a token
    const token = createToken(user._id);

    res.status(200).json({ email, user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
