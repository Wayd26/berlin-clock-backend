var express = require("express");
var toDigitalTimeController = require("../controllers/toDigitalTimeController");

/**
 * Berlin Time To Digital Time List Routes
 */

var router = express.Router();
router.get("/", toDigitalTimeController.getAllConvertion);
router.post("/", toDigitalTimeController.newConvertion);

module.exports = router;
