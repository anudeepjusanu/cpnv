/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const cors = require('cors');

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
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://cepheid.okta.com/oauth2/aus1honakne0zZrYc1d8',
  clientId: '0oa1hofl11rLR4Vjx1d8',
  assertClaims: { aud: 'api://aus1honakne0zZrYc1d8' },
});

function authenticationRequired(req, res, next) {
  if (
    req.url.includes('/users/associate') ||
    req.url.includes('/users/login') ||
    req.url.includes('/associate')
  ) {
    next();
  } else {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);
    if (!match) {
      return res.status(401).end();
    } else {
      return oktaJwtVerifier
        .verifyAccessToken(match[1])
        .then(jwt => {
          req.jwt = jwt;
          req.headers.email = jwt.claims.sub;
          next();
        })
        .catch(err => {
          res.status(401).send({
            error: 'Unauthorized',
          });
        });
      // jwt.verify(match[1], JWT_SECRET, function(err, decoded) {
      //   if (err) {
      //     return res.status(401).end();
      //   }
      //   req.headers.email = decoded.mail;
      //   next();
      // });
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
app.use(
  cors({
    origin: '*',
    exposedHeaders: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    methods: 'GET,PUT,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

app.use(v1_base_path, authenticationRequired, Router);
app.get('/healthcheck', (req, res) => {
  res.json({
    message: 'Success!!!',
  });
});
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
