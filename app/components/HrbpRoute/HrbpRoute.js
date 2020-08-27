/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'containers/Layout';
// import { HrbpLayout } from 'containers/HrbpLayout';
import HrbpLayout from '../../containers/HrbpLayout/HrbpLayout';

const HrbpRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('user') &&
      JSON.parse(localStorage.getItem('user')).apiKey ? (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ) : (
        <HrbpLayout {...props} {...rest}>
          <Component {...props} />
        </HrbpLayout>
      )
    }
  />
);

export default HrbpRoute;
