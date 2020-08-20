const appController = {};
var service = require("../../services");

appController.test = test;

module.exports = appController;

function test(req, res) {
  res.send("HELLO");
}