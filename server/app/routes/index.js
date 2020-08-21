const express = require("express");
var app_route = require("./app_routes");

const Router = express.Router();

exports = module.exports = Router;

Router.use("/app", app_route);