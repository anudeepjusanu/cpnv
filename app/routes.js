import React from 'react';
import { Switch } from 'react-router-dom';
import { PublicRoute } from 'components/PublicRoute';
import { AssociateRoute } from 'components/AssociateRoute';
import { PrivateRoute } from 'components/PrivateRoute';
import { Route } from 'react-router-dom';
import { LoginRoute } from 'components/LoginRoute';
import { HrbpRoute } from 'components/HrbpRoute';
import { Login } from 'containers/Login';
import { IntakeForm } from 'Associate/IntakeForm';
import { HRBP } from 'HRBP';
import HRBPDetail from 'HRBP/HRBPDetail';
import { HRM } from 'HRM';
import HRMDetail from 'HRM/HRMDetail';
import { CRT } from 'CRT';
import CRTDetail from 'CRT/CRTDetail';

const routes = (
  <Switch>
    <LoginRoute exact path="/" component={Login} />
    <AssociateRoute
      exact
      path="/intakeForm"
      component={IntakeForm}
      config={{ pageTitle: 'Intake Form', role: 'Associate' }}
    />
    {/* <HRBPRoute exact path="/hrbp" component={HRBP} /> */}
    <HrbpRoute
      exact
      path="/hrbp"
      component={HRBP}
      config={{ pageTitle: 'List of Cases', role: 'HRBP' }}
    />
    <HrbpRoute
      exact
      path="/hrbp/hrbpDetail"
      component={HRBPDetail}
      config={{ pageTitle: 'Case Details', role: 'HRBP' }}
    />
    <HrbpRoute
      exact
      path="/hrm"
      component={HRM}
      config={{ pageTitle: 'List of Cases', role: 'HRB' }}
    />
    <HrbpRoute
      exact
      path="/hrm/hrmDetail"
      component={HRMDetail}
      config={{ pageTitle: 'Case Details', role: 'HRB' }}
    />
    <HrbpRoute
      exact
      path="/crt"
      component={CRT}
      config={{ pageTitle: 'List of Cases', role: 'CRT' }}
    />
    <HrbpRoute
      exact
      path="/crt/crtDetail"
      component={CRTDetail}
      config={{ pageTitle: 'Case Details', role: 'CRT' }}
    />
  </Switch>
);
export default routes;
