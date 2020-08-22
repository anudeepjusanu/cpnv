const express = require('express');
const app_route = require('./app_routes');
const users_route = require('./users_routes');

const Router = express.Router();

exports = module.exports = Router;

Router.use('/app', app_route);
Router.use('/users', users_route);
