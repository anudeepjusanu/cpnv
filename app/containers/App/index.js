/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from 'utils/history';
import routes from 'routes';

import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import Theme from 'styles/theme.json';

const theme = createMuiTheme(Theme);

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Router history={history}>
          <Route>{routes}</Route>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}
