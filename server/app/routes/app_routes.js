var express = require("express");
const router = express.Router();
var controller = require("../controllers/v1");

router.route("/test").get(controller.app_controller.Test);
module.exports = router;
