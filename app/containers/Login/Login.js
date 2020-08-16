/*
 * Login
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Button from '@material-ui/core/Button';

function Login(props) {
  return (
    <React.Fragment>
      <h1>HELLO FROM CEPHEID</h1>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </React.Fragment>
  );
}

export default Login;
