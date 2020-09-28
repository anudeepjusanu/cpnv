const metaController = {};
var service = require('../../services');

metaController.getDepartments = getDepartments;
metaController.getBuildings = getBuildings;
metaController.getSymptoms = getSymptoms;

module.exports = metaController;

function getDepartments(req, res) {
  service.caseService.getDepartments().then((data) => {
    res.send({ status: true, message: "", departments: data });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function getBuildings(req, res) {
  service.caseService.getBuildings().then((data) => {
    res.send({ status: true, message: "", buildings: data });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function getSymptoms(req, res) {
  service.caseService.getSymptoms().then((data) => {
    res.send({ status: true, message: "", symptoms: data });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}
