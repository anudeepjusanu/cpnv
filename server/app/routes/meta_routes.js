var express = require('express');
const router = express.Router();
var { metaController } = require('../controllers/v1');
router.route('/departments').get(metaController.getDepartments);
router.route('/buildings').get(metaController.getBuildings);
router.route('/symptoms').get(metaController.getSymptoms);

module.exports = router;
