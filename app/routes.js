import React from 'react';
import { Switch } from 'react-router-dom';
import { PublicRoute } from 'components/PublicRoute';
import { PrivateRoute } from 'components/PrivateRoute';
import { Login } from 'containers/Login';

const routes = (
  <Switch>
    <PublicRoute exact path="/" component={Login} />
  </Switch>
);
export default routes;
