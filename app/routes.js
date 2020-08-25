import React from 'react';
import { Switch } from 'react-router-dom';
import { PublicRoute } from 'components/PublicRoute';
import { AssociateRoute } from 'components/AssociateRoute';
import { PrivateRoute } from 'components/PrivateRoute';
import { Route } from 'react-router-dom';
import { LoginRoute } from 'components/LoginRoute';
import { Login } from 'containers/Login';
import { IntakeForm } from 'Associate/IntakeForm';
import { HRBP } from 'HRBP';

const routes = (
  <Switch>
    <LoginRoute exact path="/" component={Login} />
    <PublicRoute exact path="/intakeForm" component={IntakeForm} />
    <PublicRoute exact path="/hrbp" component={HRBP}  />
  </Switch>
);
export default routes;
