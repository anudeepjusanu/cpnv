const metaController = {};
var service = require('../../services');

metaController.getDepartments = getDepartments;
metaController.getBuildings = getBuildings;

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
