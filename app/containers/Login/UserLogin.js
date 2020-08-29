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
import { login } from 'services/LoginService';

function UserLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    switch (email) {
      case 'anudeep@gmail.com':
        localStorage.setItem('token', 'abc');
        localStorage.setItem(
          'user',
          JSON.stringify({
            token: 'abc',
            mail: email,
            name: 'Anudeep',
            role: 'HRM',
          }),
        );
        history.push('/hrm');
        break;
      case 'arun@gmail.com':
        localStorage.setItem('token', 'abc');
        localStorage.setItem(
          'user',
          JSON.stringify({
            token: 'abc',
            mail: email,
            name: 'Arun',
            role: 'HRBP',
          }),
        );
        history.push('/hrbp');
        break;
      case 'harika@gmail.com':
        localStorage.setItem('token', 'abc');
        localStorage.setItem(
          'user',
          JSON.stringify({
            token: 'abc',
            mail: email,
            name: 'Harika',
            role: 'CRT',
          }),
        );
        history.push('/crt');
        break;
    }
  };

  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

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
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <Grid className="loginForm">
            <div className="form-control">
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                className="inputField"
                size="small"
                helperText="Access only for Cepheid team."
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-control">
              <TextField
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                className="inputField"
                size="small"
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </Grid>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            size="large"
            className="btn medium continue_action"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserLogin;
