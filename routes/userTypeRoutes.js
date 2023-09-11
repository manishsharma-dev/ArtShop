const express = require("express");
const router = express.Router();

const userTypeController = require("../controllers/userTypeController");

router.get("/", userTypeController.get_userType);

router.post("/", userTypeController.post_userType);

module.exports = router;
