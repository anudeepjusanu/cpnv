/*
 * Login
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component, useState } from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import Recaptcha from 'react-recaptcha';
import history from 'utils/history';
import Logo from 'images/Cepheid-logo-white.svg';
import './style.scss';

function Login(props) {
  const [isVerified, setIsVerified] = useState(false);

  const recaptchaLoaded = () => {
    console.log('capcha successfully loaded');
  };

  const handleSubscribe = () => {
    if (isVerified) {
      history.push(`/hrbp`);
    } else {
      alert('Please verify that you are a human!');
    }
  };

  const verifyCallback = response => {
    if (response) {
      setIsVerified(true);
    }
  };

  return (
    <Grid container className="LoginWrap">
      <Grid item lg={6} md={6} sm={12} className="loginLeftWrapper">
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
                  Nam gravida eros et purus porta, vel dignissim magna bibendum. Cras sit amet eros dignissim, 
                </Typography>
                <Typography variant="body2" gutterBottom>
                  pellentesque Leo vel, aliquam tortor. Quisque sit amet enim sodales, maximus sem sit amet, vestibulum ligula.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} md={6} sm={12}>
        <Grid className="loginFormWrapper">
          <Typography variant="h4" gutterBottom>
            Intake Form
          </Typography>
          <Grid className="loginForm">
            <div className="form-control">
              <TextField
                fullWidth
                id="phoneNumber"
                label="Email"
                variant="outlined"
                className="inputField"
                size="small"
                helperText="Access only for Cepheid team."
              />
            </div>
          </Grid>
          <Grid className="captcha">
            <Recaptcha
              sitekey="6LfAQcIZAAAAAKhP-NoTdl4GzwyBXenhjKwoxXOv"
              render="explicit"
              onloadCallback={recaptchaLoaded}
              verifyCallback={verifyCallback}
            />
          </Grid>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            size="large"
            className="btn medium continue_action"
            onClick={handleSubscribe}
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
