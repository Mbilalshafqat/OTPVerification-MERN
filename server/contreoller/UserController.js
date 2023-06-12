const userModel = require("../model/userSchema");
const sendEmail = require("../utils/SendEmail");
const OTPModel = require("../model/OTP");
const bcrypt = require("bcrypt");

module.exports = {
  // ------------ create User

  CreateUser: async (req, res) => {
    try {
      var { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please Enter All Fields",
        });
      }

      const IsUser = await userModel.findOne({ email });
      if (IsUser) {
        return res.status(400).json({
          success: false,
          message: `this ${email} Email is Already Exist Please Login`,
        });
      }
      var OPTrANDOM = Math.floor(Math.random() * 9000) + 1000;
      await OTPModel.create({
        OTP: OPTrANDOM,
      });
      const message = `Your OTP is ${OPTrANDOM} kindly verify Your OTP`;

      try {
        await sendEmail({
          email,
          message,
          subject: "Please Verify Your OTP",
        });

        res.status(200).json({
          success: false,
          message: `Email Successfuly Send to ${email}`,
        });
      } catch (error) {
        (req.OPT = undefined),
          res.status(400).json({
            success: false,
            message: error.message,
          });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   ------------- create User After Verification OPT
  createUserAfterOPT: async (req, res) => {
    try {
      const { OTP } = req.body;
      if (!OTP) {
        return res.status(400).json({
          success: false,
          message: "Please Enter Your OTP",
        });
      }
      const OTPfIND = await OTPModel.findOne({ OTP });
      if (!OTPfIND) {
        return res.status(400).json({
          success: false,
          message: "Please Enter Valid OTP",
        });
      }
      if (OTP === OTPfIND.OTP) {
        const { username, email, password } = req.body;
        await userModel.create({
          username,
          email,
          password,
        });
        res.status(200).json({
          success: true,
          message: "Registration Successfuly",
        });
        await OTPModel.findOneAndDelete(OTPfIND.OTP);
      } else {
        res.status(400).json({
          success: false,
          message: "OTP not match",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   ------------------- login

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "PLease fill all fields",
        });
      }

      const IsUser = await userModel.findOne({ email });
      if (!IsUser) {
        return res.status(400).json({
          success: false,
          message: "Please Enter Valid Data",
        });
      }
      const isMatch = await bcrypt.compare(password, IsUser.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Please Enter Valid Data",
        });
      }

      res.status(200).json({
        success: true,
        message: "Login Successfulr",
        IsUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
