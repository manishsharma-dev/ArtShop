require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getUserByParam } = require("../helpers/getUsersbyParamater");
const { unauthorizedResponse } = require("../helpers/apiResponse");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    unauthorizedResponse(res, 401, "Unauthorised Api Call");
    return;
  }
  try{
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!user) unauthorizedResponse(res, 403, "Unauthorised Api Call");
     const userData = await getUserByParam({ email: user.email }).catch(
    (err) => {
      unauthorizedResponse(res, 403, "Unauthorised Api Call");
      return;
    }
    );
    req.user = userData;
    next();
  }
  catch (err) {
    if (err.name === 'TokenExpiredError') {
    return unauthorizedResponse(res, 401, "Unauthorised Api Call"); // ✅ More semantically correct
  }
    return unauthorizedResponse(res, 403, "Unauthorised Api Call");
  }
};

module.exports = authenticate;
