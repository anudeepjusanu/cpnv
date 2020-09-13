var express = require('express');
const router = express.Router();
var controller = require('../controllers/v1');
router.route('/associate').get(controller.users_controller.getAssociate);
router.route('/login').post(controller.users_controller.getUserLogin);
router
  .route('/changePassword')
  .post(controller.users_controller.changePassword);
router.route('/role').get(controller.users_controller.getUser);
module.exports = router;
