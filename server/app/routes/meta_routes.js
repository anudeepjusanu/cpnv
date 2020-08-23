var express = require('express');
const router = express.Router();
var { metaController } = require('../controllers/v1');
router.route('/departments').get(metaController.getDepartments);

module.exports = router;
