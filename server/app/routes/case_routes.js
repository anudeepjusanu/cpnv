var express = require('express');
const router = express.Router();
var { caseController } = require('../controllers/v1');

router.route('/login').post(caseController.getUserLogin);

router.route('/cases').get(caseController.getCases);
router.route('/crtUsers').get(caseController.getActiveCRTUsers);
router.route('/updateReason/:caseId').put(caseController.updateCaseReason);
router.route('/associates/:caseId').put(caseController.updateCaseAssociates);
router.route('/nonAssociates/:caseId').put(caseController.updateCaseNonAssociates);

router.route('/changeToReview/:caseId').put(caseController.changeToReview);
router.route('/changeToArchive/:caseId').put(caseController.changeToArchive);
router.route('/addCRTReview/:caseId').post(caseController.addCRTReview);
router.route('/addHRMReview/:caseId').post(caseController.addHRMReview);
router.route('/caseFinalAction/:caseId').post(caseController.caseFinalAction);
router.route('/caseClose/:caseId').put(caseController.caseClose);
router.route('/reviews/:caseId').get(caseController.getCaseReviews);

router.route('/:caseId').get(caseController.getCase);
router.route('/').post(caseController.addCase);
router.route('/:caseId').put(caseController.updateCase);
router.route('/test/email').get(caseController.testEmail);
router.route('/remindCRT/:caseId').post(caseController.remindCRT);

module.exports = router;
