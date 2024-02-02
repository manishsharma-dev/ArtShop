const User = require("../models/UserModel");
const UserType = require("../models/userType");
const Password = require("../models/PasswordModel");
const { getUserByParam } = require("../helpers/getUsersbyParamater");
const { generateErrorMessage } = require("../helpers/GenerateErrorMessage");
const apiResponse = require("../helpers/apiResponse");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendLoginResponse = require("../helpers/jwtToken")
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

const login = catchAsyncErrors(async (req, res) => {
  try {
    const request = { email: req.body.email };
    const userData = await getUserByParam(request).catch((err) => {
      throw err;
    });
    if (userData?.length) {
      const user = userData[0];
      const userPassword = await Password.findOne({ userId: user._id });
      if (userPassword) {
        const response = await userPassword.comparePassword(req.body.password);
        if (response) {
          const userEmail = { email: req.body.email };
          sendLoginResponse(user, 200, res);
        } else {
          return apiResponse.ErrorResponse(
            res,
            generateErrorMessage({ message: "Invalid email/password" })
          );
        }

      } else {
        return apiResponse.ErrorResponse(
          res,
          generateErrorMessage({ message: "Invalid email/password" })
        );
      }
    } else {
      return apiResponse.ErrorResponse(
        res,
        generateErrorMessage({ message: "Invalid email/password" })
      );
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, generateErrorMessage(err));
  }
});

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const toHashString = CryptoJS.AES.encrypt(user._id, process.env.CRYPTO_SECRET);
    
    return apiResponse.successResponseWithData(res, null, user);
  }
  else {
    return apiResponse.ErrorResponse(
      res,
      generateErrorMessage({ message: "Email not found! Please signup to use application" })
    );
  }
})

module.exports = {
  login,
  forgotPassword
};
