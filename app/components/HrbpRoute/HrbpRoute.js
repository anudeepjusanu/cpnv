/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { HrbpLayout } from 'containers/HrbpLayout';
import HrbpLayout from 'containers/HrbpLayout/HrbpLayout';

const HrbpRoute = ({ component: Component, ...rest }) => {
  const roles = {
    HRM: 'hrm',
    HRBP: 'hrbp',
    CRT: 'crt',
  };
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Route
      {...rest}
      render={props =>
        user && user.token ? (
          user.role === rest.config.role ? (
            <HrbpLayout {...props} {...rest}>
              <Component {...props} />
            </HrbpLayout>
          ) : (
            <Redirect
              to={{
                pathname: `/${roles[user.role]}/caseList`,
                state: { from: props.location },
              }}
            />
          )
        ) : (
          <Redirect
            to={{ pathname: '/userLogin', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default HrbpRoute;
