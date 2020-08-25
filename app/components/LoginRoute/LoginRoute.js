/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Login } from 'containers/Login';

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('user') &&
      JSON.parse(localStorage.getItem('user')).apiKey ? (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ) : (
        <Login {...props} {...rest}>
          <Component {...props} />
        </Login>
      )
    }
  />
);

export default LoginRoute;
