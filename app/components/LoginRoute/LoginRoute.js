/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Login } from 'containers/Login';
import { useOktaAuth } from '@okta/okta-react';
import { getRole } from 'services/LoginService';


const LoginRoute = ({ component: Component, ...rest }) => {
  const { authState, authService } = useOktaAuth();
  const [associate, setAssociate] = useState(true);
  const [userInfo, setUserInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  const roles = {
    HRM: 'hrm',
    HRBP: 'hrbp',
    CRT: 'crt',
  };

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setAssociate(true);
      setLoading(false);
      // When user isn't authenticated, forget any user info

    } else {
      setLoading(true);
      authService.getUser().then((info) => {
        setAssociate(false);
        console.log(info);
        getRole("jennifer.marasco@cepheid.com").then(response => {
          if (response.data && response.data.user && response.data.user.role) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUserInfo(response.data.user);
          }
          setLoading(false);
          //history.push(`/${roles[res.data.user.role]}/caseList`);
        }, (error) => {

        })
      });
    }
  }, [authState, authService]);

  return (<Route
    {...rest}
    render={props =>
      loading ? <div>Loading</div> :
        associate ? (
          <Login {...props} {...rest}>
            <Component {...props} />
          </Login>
        ) : (
            userInfo ?
              <Redirect to={{ pathname: `/${roles[userInfo.role]}/caseList`, state: { from: props.location } }} />
              :
              <div>You dont have access to this Application</div>
          )
    }
  />
  )
};

export default LoginRoute;
