require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getUserByParam } = require("../helpers/getUsersbyParamater");
const { unauthorizedResponse } = require("../helpers/apiResponse");
const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorisation"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    unauthorizedResponse(res, 401, "Unauthorised Api Call");
    return;
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) unauthorizedResponse(res, 403, "Unauthorised Api Call");
    const userData = await getUserByParam({ email: user.email }).catch(
      (err) => {
        unauthorizedResponse(res, 401, "Unauthorised Api Call");
        return;
      }
    );
    req.user = userData;
    next();
  });
};

module.exports = authenticate;
