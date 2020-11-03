const metaController = {};
var service = require('../../services');

metaController.getDepartments = getDepartments;
metaController.getBuildings = getBuildings;
metaController.getSymptoms = getSymptoms;

module.exports = metaController;

function getDepartments(req, res) {
  service.caseService.getDepartments().then((data) => {
    var = departments = [];
    _.each(data, function (item) {
      var deptIndex = _.findIndex(departments, { department_id: item.department_id });
      if (deptIndex >= 0) {
        departments[deptIndex].users.push({
          email: item.email,
          first_name: item.first_name,
          last_name: item.last_name
        });
      } else {
        departments.push({
          department_id: item.department_id,
          department_name: item.department_name,
          email: item.email,
          first_name: item.first_name,
          last_name: item.last_name,
          users: [{
            email: item.email,
            first_name: item.first_name,
            last_name: item.last_name
          }]
        });
      }

    });
    res.send({ status: true, message: "", departments: departments });
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
