const User = require("../models/UserModel");
const UserType = require("../models/userType");
const Password = require("../models/PasswordModel");
const { getUserByParam } = require("../helpers/getUsersbyParamater");
const { generateErrorMessage } = require("../helpers/GenerateErrorMessage");
const apiResponse = require("../helpers/apiResponse");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendLoginResponse = require("../helpers/jwtToken");
const UserController = require("../controllers/UserController");
const sendEmail = require("../helpers/sendMail")
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

const login = catchAsyncErrors(async (req, res) => {
  try {
    const request = { email: req.body.email };
    const userData = await User.findOne(request).populate('gender')
      .populate('country').populate('userType').catch((err) => {
        throw err;
      });
    
    if (userData) {
      const user = userData;
      const userPassword = await Password.findOne({ userId: user._id});
      if (userPassword) {
        const response = await userPassword.comparePassword(req.body.password);
        if (response) {
          const userEmail = { email: req.body.email };
          sendLoginResponse(user, 200, res);
        } else {
          return apiResponse.notFoundResponse(
            res,
            generateErrorMessage({ message: "Invalid email/password" })
          );
        }

      } else {
        return apiResponse.notFoundResponse(
          res,
          generateErrorMessage({ message: "Invalid email/password" })
        );
      }
    } else {
      return apiResponse.notFoundResponse(
        res,
        generateErrorMessage({ message: "Invalid email/password" })
      );
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, generateErrorMessage(err));
  }
});

const adminRefreshToken = catchAsyncErrors(async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({email: payload.email});
    if (!user || user.refreshToken !== token) return res.sendStatus(403);

    const newAccessToken = user.getJwtToken();
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.sendStatus(403);
  }

});

const logout = catchAsyncErrors(async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }
  res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
  });
  return res.status(200).json({
      status: true,
      message: "Logout successful"
    });
});

const register = catchAsyncErrors(async (req, res) => {
  const request = req.body;
  request.userType = "650086b7fd2d9e9d6690f739";
  req.body = request;
  const registeredUser = await UserController.post_User(req, res);
})

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const toHashString = CryptoJS.AES.encrypt(user._id.toString(), process.env.CRYPTO_SECRET);
    const resetUrl = `${process.env.FRONT_END_URL}/auth/resetpassword/?t=${toHashString}`;
    const message = `
  <p>Hello,</p>
  <p>We received a request to reset your password. Click the link below to reset it:</p>
  <a href="${resetUrl}">${resetUrl}</a>
  <p>If you didn't request this, you can ignore this email.</p>
  <p>Best regards,<br>The Art Shop</p>
`;
    await sendEmail({
      email,
      subject: 'Request for Password Reset - The Art Shop',
      messageStr: message
    })
    return apiResponse.successResponse(res, 'Please check your email for password reset link');
  }
  else {
    return apiResponse.ErrorResponse(
      res,
      generateErrorMessage({ message: "Email not found! Please signup to use the application" })
    );
  }
})
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { password, token } = req.body;
  const bytes = CryptoJS.AES.decrypt(token, process.env.CRYPTO_SECRET);
  var userId = bytes.toString(CryptoJS.enc.Utf8);
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return apiResponse.ErrorResponse(
      res,
      generateErrorMessage({ message: "Invalid request, Please check your request and try again" })
    );
  }
  const passwordModel = await Password.findOne({ userId: userId });
  if (!passwordModel) {
    return apiResponse.ErrorResponse(
      res,
      generateErrorMessage({ message: "Invalid request, Please check your request and try again" })
    );
  }
  passwordModel.password = password;
  await passwordModel.save();
  apiResponse.successResponse(res, 'Password updated successfully')
})

module.exports = {
  login,
  logout,
  adminRefreshToken,
  register,
  forgotPassword,
  resetPassword
};
