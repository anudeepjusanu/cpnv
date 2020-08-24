const caseController = {};
var service = require('../../services');

caseController.getCases = getCases;
caseController.getCase = getCase;
caseController.addCase = addCase;
caseController.updateCase = updateCase;
caseController.updateCaseReason = updateCaseReason;
caseController.updateCaseAssociates = updateCaseAssociates;
caseController.updateCaseNonAssociates = updateCaseNonAssociates;

module.exports = caseController;

function getCases(req, res) {
  service.caseService.getCases().then((data) => {
    res.send({ status: true, message: "", departments: data });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function getCase(req, res) {
  service.caseService.getCase(req.params.caseId).then((data) => {
    res.send({ status: true, message: "", case: data[0] });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function addCase(req, res) {
  console.log(req.body);
  service.caseService.addCase(req.body).then((data) => {
    res.send({ status: true, message: "", case: data });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function updateCase(req, res) {
  service.caseService.updateCase(req.params.caseId, req.body).then((data) => {
    res.send({ status: true, message: "", case: data });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function updateCaseReason(req, res) {
  var caseData = {
    reason: req.body.reason
  };
  if (caseData.reason == "Exposed") {
    caseData.exposure_date = req.body.exposure_date;
    caseData.exposure_describe = req.body.exposure_describe;
  } else if (caseData.reason == "Diagnosed") {
    caseData.is_positive_diagnosis = req.body.is_positive_diagnosis;
    caseData.diagnosis_received_date = req.body.diagnosis_received_date;
    caseData.diagnosis_test_date = req.body.diagnosis_test_date;
  } else if (caseData.reason == "Symptoms") {
    caseData.symptoms_began_date = req.body.symptoms_began_date;
    caseData.symptoms_respiratory = req.body.symptoms_respiratory;
    caseData.have_consult_doctor = req.body.have_consult_doctor;
    caseData.consult_date = req.body.consult_date;
  } else if (caseData.reason == "Quarantine") {

  }
  caseData.company_buildings = req.body.company_buildings ? req.body.company_buildings : null;
  caseData.additional_info = req.body.additional_info ? req.body.additional_info : null;

  service.caseService.updateCase(req.params.caseId, caseData).then((data) => {
    res.send({ status: true, message: "", case: data });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function updateCaseAssociates(req, res) {
  if (req.body) {
    var objData = [];
    for (var i = 0; i < req.body.length; i++) {
      var row = req.body[i];
      objData.push({
        "case_id": req.params.caseId,
        "is_associate": "1",
        "first_name": row.first_name,
        "last_name": row.last_name,
        "has_social_distance": row.has_social_distance,
        "ppe_worn": row.ppe_worn,
        "duration": row.duration,
        "created_on": "NOW()"
      });
    }
  }
  service.caseService.addCaseAssociates(objData).then((data) => {
    res.send({ status: true, message: "", case: data });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function updateCaseNonAssociates(req, res) {
  if (req.body) {
    var objData = [];
    for (var i = 0; i < req.body.length; i++) {
      var row = req.body[i];
      objData.push({
        "case_id": req.params.caseId,
        "is_associate": "0",
        "first_name": row.first_name,
        "last_name": row.last_name,
        "company_name": row.company_name,
        "details": row.details,
        "created_on": "NOW()"
      });
    }
  }
  service.caseService.addCaseAssociates(objData).then((data) => {
    res.send({ status: true, message: "", case: data });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}