const User = require("../models/UserModel");
const UserType = require("../models/userType");
const Password = require("../models/PasswordModel");
const { getUserByParam } = require("../helpers/getUsersbyParamater");
const { generateErrorMessage } = require("../helpers/GenerateErrorMessage");
const apiResponse = require("../helpers/apiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const request = { email: req.body.email };
    const userData = await getUserByParam(request).catch((err) => {
      throw err;
    });
    if (userData?.length) {
      const user = userData[0];
      const userPassword = await Password.find({ userId: user._id }).catch(
        (err) => {
          throw err;
        }
      );
      if (userPassword?.length) {
        await bcrypt.compare(
          req.body.password,
          userPassword[0].password,
          function (err, response) {
            if (response) {
              const userEmail = { email: req.body.email };
              const accessToken = jwt.sign(
                userEmail,
                process.env.ACCESS_TOKEN_SECRET
              );
              const responseData = { userData: user, token: { accessToken } };
              apiResponse.successResponseWithData(
                res,
                "Login Successfull",
                responseData
              );
            } else {
              return apiResponse.ErrorResponse(
                res,
                generateErrorMessage({ message: "Invalid email/password" })
              );
            }
          }
        );
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
};

module.exports = {
  login,
};
