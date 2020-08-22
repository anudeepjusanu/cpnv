/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');

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
var { v1_base_path } = require('./config');

const SimpleLDAP = require('simple-ldap-search').default;
SimpleLDAP.LDAP_OPT_X_TLS_NEVER = 1;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const ldapConfig = {
  url: 'ldap://10.169.82.210:389',
  base: 'DC=CEPHEID,DC=PRI',
  dn:
    'CN=SVC webauth,OU=Service Admins,OU=Operations Accounts,DC=CEPHEID,DC=PRI',
  password: 'QgkVy7tj2HgUoAX0DYVJ',
};

function authenticationRequired(req, res, next) {
  next();
}

// In production we need to pass these values in instead of relying on webpack
app.post('/ldapSearch', (req, res) => {
  ldap = new SimpleLDAP(ldapConfig);
  const filter = '(sAMAccountName=shivakrishna.milukur)';
  ldap.search(filter, '*').then(
    users => {
      res.json({
        message: 'HEY',
        name: users[0].displayName,
      });
    },
    err => {
      console.log(err);
    },
  );
});

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
