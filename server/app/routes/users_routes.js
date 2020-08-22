var express = require('express');
const router = express.Router();
var controller = require('../controllers/v1');
router.route('/associate').get(controller.users_controller.getAssociate);
module.exports = router;
