const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  OTP: { type: String, required: true },
});

const OTPModel = mongoose.model("OTP", OTPSchema);
module.exports = OTPModel;
