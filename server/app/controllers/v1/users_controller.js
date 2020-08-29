const usersController = {};
var service = require('../../services');

usersController.getAssociate = getAssociate;
usersController.getUserLogin = getUserLogin;

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

function getUserLogin(req, res) {
  var objData = {
    email: req.body.email,
    pwd: req.body.password,
  };
  service.usersService
    .getUserLogin(objData)
    .then(data => {
      res.send({ status: true, message: '', user: data });
    })
    .catch(error => {
      console.log(error);
      res.status(400).send({ status: false, error: error.message });
    });
}
