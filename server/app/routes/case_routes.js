var express = require('express');
const router = express.Router();
var { caseController } = require('../controllers/v1');

router.route('/cases').get(caseController.getCases);
router.route('/updateReason/:caseId').put(caseController.updateCaseReason);
router.route('/associates/:caseId').put(caseController.updateCaseAssociates);
router.route('/nonAssociates/:caseId').put(caseController.updateCaseNonAssociates);

router.route('/:caseId').get(caseController.getCase);
router.route('/').post(caseController.addCase);
router.route('/:caseId').put(caseController.updateCase);

module.exports = router;
