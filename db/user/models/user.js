const mongoose = require("mongoose");
const { Schema } = mongoose;

const { accountConstant } = require("../../../constant/model");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  signUpType: {
    type: String,
    enum: accountConstant.signUpType,
    default: accountConstant.defaultSignUpType,
    required: true,
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
