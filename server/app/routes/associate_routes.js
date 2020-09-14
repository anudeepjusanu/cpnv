var express = require('express');
const router = express.Router();
var { caseController } = require('../controllers/v1');

router.route('/case/updateReason/:caseId').put(caseController.updateCaseReason);
router.route('/case/associates/:caseId').put(caseController.updateCaseAssociates);
router.route('/case/nonAssociates/:caseId').put(caseController.updateCaseNonAssociates);

router.route('/case/:caseId').get(caseController.getAssociateCase);
router.route('/case').post(caseController.addCase);
router.route('/case/:caseId').put(caseController.updateCase);

module.exports = router;
