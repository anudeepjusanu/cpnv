const caseController = {};
var service = require('../../services');

caseController.getCases = getCases;
caseController.getCase = getCase;
caseController.addCase = addCase;
caseController.updateCase = updateCase;

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
