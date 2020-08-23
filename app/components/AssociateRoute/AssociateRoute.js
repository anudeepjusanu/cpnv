/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'containers/Layout';

const AssociateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('user') &&
      JSON.parse(localStorage.getItem('user')).apiKey ? (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ) : (
        <Layout {...props} {...rest}>
          <Component {...props} />
        </Layout>
      )
    }
  />
);

export default AssociateRoute;
