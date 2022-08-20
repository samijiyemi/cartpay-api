const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("E-mail is invalid");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Input must not contains 'password'");
      }
    },
  },
});

module.exports = User;
