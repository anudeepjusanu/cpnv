const caseController = {};
var service = require('../../services');

caseController.getCases = getCases;
caseController.getCase = getCase;
caseController.addCase = addCase;
caseController.updateCase = updateCase;
caseController.updateCaseReason = updateCaseReason;
caseController.updateCaseAssociates = updateCaseAssociates;
caseController.updateCaseNonAssociates = updateCaseNonAssociates;
caseController.changeToReview = changeToReview;
caseController.addCRTReview = addCRTReview;
caseController.addHRMReview = addHRMReview;
caseController.caseFinalAction = caseFinalAction;
caseController.caseClose = caseClose;
caseController.getUserLogin = getUserLogin;
caseController.getCaseReviews = getCaseReviews;

module.exports = caseController;

function getCases(req, res) {
  service.caseService.getCases(req.headers.email).then(data => {
    res.send({ status: true, message: '', cases: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function getCaseReviews(req, res) {
  service.caseService.getCaseReviews(req.params.caseId).then(data => {
    res.send({ status: true, message: '', reviews: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function getCase(req, res) {
  service.caseService.getCase(req.params.caseId, req.headers.email).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function addCase(req, res) {
  service.caseService.addCase(req.body).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function updateCase(req, res) {
  service.caseService.updateCase(req.params.caseId, req.body).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function updateCaseReason(req, res) {
  var caseData = {
    reason: req.body.reason,
  };
  if (caseData.reason == 'Exposed') {
    caseData.exposure_date = req.body.exposure_date;
    caseData.exposure_describe = req.body.exposure_describe;
  } else if (caseData.reason == 'Diagnosed') {
    caseData.is_positive_diagnosis = req.body.is_positive_diagnosis;
    caseData.diagnosis_received_date = req.body.diagnosis_received_date;
    caseData.diagnosis_test_date = req.body.diagnosis_test_date;
  } else if (caseData.reason == 'Symptoms') {
    caseData.symptoms_began_date = req.body.symptoms_began_date;
    caseData.symptoms_respiratory = req.body.symptoms_respiratory;
    caseData.have_consult_doctor = req.body.have_consult_doctor;
    caseData.consult_date = req.body.consult_date;
  } else if (caseData.reason == 'Quarantine') {
  }
  caseData.company_buildings = req.body.company_buildings ? req.body.company_buildings : null;
  caseData.additional_info = req.body.additional_info ? req.body.additional_info : null;

  service.caseService.updateCase(req.params.caseId, caseData).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function updateCaseAssociates(req, res) {
  if (req.body) {
    var objData = [];
    for (var i = 0; i < req.body.length; i++) {
      var row = req.body[i];
      objData.push({
        case_id: req.params.caseId,
        is_associate: '1',
        first_name: row.first_name,
        last_name: row.last_name,
        has_social_distance: row.has_social_distance,
        ppe_worn: row.ppe_worn,
        duration: row.duration,
        created_on: 'NOW()',
      });
    }
  }
  service.caseService.addCaseAssociates(objData).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function updateCaseNonAssociates(req, res) {
  if (req.body) {
    var objData = [];
    for (var i = 0; i < req.body.length; i++) {
      var row = req.body[i];
      objData.push({
        case_id: req.params.caseId,
        is_associate: '0',
        first_name: row.first_name,
        last_name: row.last_name,
        company_name: row.company_name,
        details: row.details,
        created_on: 'NOW()',
      });
    }
  }
  service.caseService.addCaseAssociates(objData).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function changeToReview(req, res) {
  var objData = {
    case_status: 'Under Review',
    review_additional_info: req.body.review_additional_info,
  };
  service.caseService.updateCase(req.params.caseId, objData).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function addCRTReview(req, res) {
  req.body.case_id = req.params.caseId;
  req.body.email = req.headers.email;
  service.caseService.addCRTReview(req.body).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function addHRMReview(req, res) {
  req.body.case_id = req.params.caseId;
  service.caseService.addHRMReview(req.body).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function caseFinalAction(req, res) {
  var objData = {
    case_status: "Final Action",
    final_test_result: req.body.final_test_result ? req.body.final_test_result : null,
    final_quarantine_started: req.body.final_quarantine_started ? req.body.final_quarantine_started : null,
    final_quarantine_start_date: req.body.final_quarantine_start_date ? req.body.final_quarantine_start_date : null,
    final_quarantine_end_date: req.body.final_quarantine_end_date ? req.body.final_quarantine_end_date : null,
    final_other_info: req.body.final_other_info ? req.body.final_other_info : null
  };
  service.caseService.updateCase(req.params.caseId, objData).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function caseClose(req, res) {
  var objData = {
    case_status: "Case Closed"
  };
  service.caseService.updateCase(req.params.caseId, objData).then(data => {
    res.send({ status: true, message: '', case: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function getUserLogin(req, res) {
  var objData = {
    email: req.body.email,
    pwd: req.body.password,
  };
  service.caseService.getUserLogin(objData).then(data => {
    data = data[0] ? data[0] : {};
    res.send({ status: true, message: '', user: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}
