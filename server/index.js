/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
var Router = require('./app/routes/index');

const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();
var { v1_base_path, JWT_SECRET } = require('./config');
var jwt = require('jsonwebtoken');

function authenticationRequired(req, res, next) {
  if (
    req.url.includes('/users/associate') ||
    req.url.includes('/users/login')
  ) {
    next();
  } else {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) {
      return res.status(401).end();
    } else {
      jwt.verify(match[1], JWT_SECRET, function(err, decoded) {
        if (err) {
          return res.status(401).end();
        }
        req.headers.email = decoded.mail;
        next();
      });
    }
  }
}

app.use(bodyParser.json()); //parsing request body
morganBody(app);
//morganBody(app, { stream: accessLogStream, noColors: true });
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
); //parsing request queries

app.use(v1_base_path, authenticationRequired, Router);
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
