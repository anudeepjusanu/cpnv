import React from 'react';
import { Switch } from 'react-router-dom';
import { PublicRoute } from 'components/PublicRoute';
import { AssociateRoute } from 'components/AssociateRoute';
import { PrivateRoute } from 'components/PrivateRoute';
import { Route } from 'react-router-dom';
import { Login } from 'containers/Login';
import { IntakeForm } from 'Associate/IntakeForm';

const routes = (
  <Switch>
    <PublicRoute exact path="/" component={Login} />
    <PublicRoute exact path="/intakeForm" component={IntakeForm} />
  </Switch>
);
export default routes;
