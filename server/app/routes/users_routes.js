var express = require('express');
const router = express.Router();
var controller = require('../controllers/v1');
router.route('/associate').get(controller.users_controller.getAssociate);
router.route('/login').post(controller.users_controller.getUserLogin);
module.exports = router;
