const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/Authenticate");
const UserController = require("../controllers/UserController");

router.get("/", authenticate, UserController.get_Users);

router.get("/:id", authenticate, UserController.get_UserbyId);

router.post("/", UserController.post_User);

module.exports = router;
