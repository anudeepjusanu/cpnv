/*
 * Login
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component, useState, useEffect } from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import history from 'utils/history';
import Logo from 'images/Cepheid-logo-white.svg';
import './style.scss';
import { roleLogin } from 'services/LoginService';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';

import { useOktaAuth } from '@okta/okta-react';
import LoginForm from './LoginForm';

const roles = {
  HRM: 'hrm',
  HRBP: 'hrbp',
  CRT: 'crt',
};
function UserLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const handleSubmit = () => {
    setShowLoading(true);
    roleLogin({ email: email, password: password })
      .then(res => {
        setShowLoading(false);
        if (res && res.data) {
          if (res.data.user) {
            localStorage.setItem('token', res.data.user.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            history.push(`/${roles[res.data.user.role]}/caseList`);
          } else {
            alert('Invalid Username password');
          }
        }
      })
      .catch(err => {
        setShowLoading(false);
        console.log('ERR', err);
      });
  };

  const callRoles = () => { };

  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('okta-token-storage');
    localStorage.removeItem('okta-cache-storage');
    localStorage.removeItem('okta-pkce-storage');
    if (authState.isAuthenticated) {
      callRoles();
    }
  }, []);

  const { authState } = useOktaAuth();

  return (
    <Grid container className="LoginWrap">
      <Grid item lg={6} md={6} sm={6} xs={12} className="loginLeftWrapper">
        <Grid className="leftContent">
          <Grid className="leftContentIn">
            <Grid container>
              <Grid item xs={12} className="logo">
                <img src={Logo} alt="Cepheid" />
              </Grid>
              <Grid item xs={12} className="loginText">
                <Typography variant="h4" gutterBottom>
                  USA Covid-19 Intake Form
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Nam gravida eros et purus porta, vel dignissim magna bibendum.
                  Cras sit amet eros dignissim,
                </Typography>
                <Typography variant="body2" gutterBottom>
                  pellentesque Leo vel, aliquam tortor. Quisque sit amet enim
                  sodales, maximus sem sit amet, vestibulum ligula.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Grid className="loginFormWrapper">
          {authState.isPending && <div>Loading authentication...</div>}
          {authState.isAuthenticated ? (
            //<Redirect to={{ pathname: '/' }} />
            <div>Logged In</div>
          ) : (
              <LoginForm issuer="https://cepheid.okta.com/oauth2/aus1honakne0zZrYc1d8" />
            )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserLogin;
