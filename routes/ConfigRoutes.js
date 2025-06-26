const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const authenticate = require("../middleware/Authenticate");

router.post('/getMultipleConfigs', authenticate, configController.getMultipleConfig);

router.post('/', authenticate, configController.postNewConfig);

module.exports = router;

