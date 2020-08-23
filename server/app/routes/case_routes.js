var express = require('express');
const router = express.Router();
var { caseController } = require('../controllers/v1');

router.route('/cases').get(caseController.getCases);

router.route('/:caseId').get(caseController.getCase);
router.route('/').post(caseController.addCase);
router.route('/:caseId').put(caseController.updateCase);

module.exports = router;
