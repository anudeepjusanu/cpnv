/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('user') &&
      JSON.parse(localStorage.getItem('user')).apiKey ? (
        <Redirect
          to={{ pathname: '/dashboard', state: { from: props.location } }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default PublicRoute;
