'use strict';
const app_controller = require('./app_controller');
const users_controller = require('./users_controller');
const meta_controller = require('./meta_controller');
const case_controller = require('./case_controller');

module.exports = {
  app_controller: app_controller,
  users_controller: users_controller,
  metaController: meta_controller,
  caseController: case_controller,
};
