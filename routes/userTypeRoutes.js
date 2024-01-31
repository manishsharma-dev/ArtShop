const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/Authenticate");
const userTypeController = require("../controllers/userTypeController");

router.get("/",authenticate, userTypeController.get_userType);

router.post("/",authenticate, userTypeController.post_userType);

module.exports = router;
