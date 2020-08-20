#!/usr/bin/env node
var app = require('../server');
const { PORT } = require('../../config');

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
