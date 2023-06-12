const mongoose = require("mongoose");
const Validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please Enter Your UserName"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email Adress"],
    validate: [Validator.isEmail, "Please Enter Valid Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password must be greater then 8 character"],
  },
  OPT: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const userModel = mongoose.model("Authuser", userSchema);
module.exports = userModel;
