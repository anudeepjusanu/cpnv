/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'containers/Layout';

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
        <Layout {...props} {...rest}>
          <Component {...props} />
        </Layout>
      )
    }
  />
);

export default PublicRoute;
