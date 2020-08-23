const metaController = {};
var service = require('../../services');

metaController.getDepartments = getDepartments;

module.exports = metaController;

function getDepartments(req, res) {
  service.caseService.getDepartments().then((data) => {
    res.send({ status: true, message: "", departments: data });
  }).catch((error) => {
    res.status(400).send({ status: false, error: error.message });
  });
}
