const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.adminRefreshToken);
router.post("/logout",AuthController.logout);
router.post("/register", AuthController.register);
router.post("/forgotpassword", AuthController.forgotPassword);
router.post("/resetpassword", AuthController.resetPassword);

module.exports = router;
