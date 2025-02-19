const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema();

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// statc sgnup method
userSchema.statics.signup = async function (email, password) {
  // validate email
  if (!email || !password) {
    throw Error("email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("email is invalid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("password must be at least 6 characters");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("email already exists");
  }

  //   salt password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("email and password are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("email does not exist");
  }

  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    throw Error("password is incorrect");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
