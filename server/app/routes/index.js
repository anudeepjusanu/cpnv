const express = require('express');
const app_route = require('./app_routes');
const users_route = require('./users_routes');
const meta_route = require('./meta_routes');
const case_route = require('./case_routes');
const associate_route = require('./associate_routes');

const Router = express.Router();

exports = module.exports = Router;

Router.use('/app', app_route);
Router.use('/users', users_route);
Router.use('/meta', meta_route);
Router.use('/case', case_route);
Router.use('/associate', associate_route);
