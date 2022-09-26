var express = require("express");
var toBerlinTimeController = require("../controllers/toBerlinTimeController");

/**
 * Berlin Time To Digital Time List Routes
 */
var router = express.Router();
router.get("/", toBerlinTimeController.getAllConvertion);
router.post("/", toBerlinTimeController.newConvertion);
module.exports = router;
