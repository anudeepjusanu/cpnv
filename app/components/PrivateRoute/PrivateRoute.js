/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('user') &&
      JSON.parse(localStorage.getItem('user')).forbidden ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/dashboard', state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
