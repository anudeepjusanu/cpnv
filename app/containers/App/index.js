/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import history from 'utils/history';
import routes from 'routes';

import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { Security } from '@okta/okta-react';

import Theme from 'styles/theme.json';

const theme = createMuiTheme(Theme);

const config = {
  clientId: '0oa1hofl11rLR4Vjx1d8',
  issuer: 'https://cepheid.okta.com/oauth2/aus1honakne0zZrYc1d8',
  redirectUri: 'http://localhost:3000/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};

export default function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Router history={history}>
          <Security {...config}>
            <Route>{routes}</Route>
          </Security>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}
