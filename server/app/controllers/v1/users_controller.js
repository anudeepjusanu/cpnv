const usersController = {};
var service = require('../../services');

usersController.getAssociate = getAssociate;

module.exports = usersController;

function getAssociate(req, res) {
  if (req.query && req.query.email) {
    service.usersService.getAssociateInfo(req.query.email).then(
      result => {
        res.json(result);
      },
      error => {
        res.json(error);
      },
    );
  } else {
    res.json({
      error: 'email id cannot be null',
    });
  }
}
