/*
 * Login
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component, useState, useEffect } from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import Recaptcha from 'react-recaptcha';
import history from 'utils/history';
import Logo from 'images/Cepheid-logo-white.svg';
import './style.scss';
import { login } from 'services/LoginService';
import Loader from 'react-loader-spinner';
import { useAlert } from 'react-alert';

function Login(props) {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const alert = useAlert();

  const recaptchaLoaded = () => {
    console.log('capcha successfully loaded');
  };

  const handleSubscribe = () => {
    if (isVerified) {
      if(email.endsWith("cepheid.com")){
        setShowLoading(true);
      login(email)
        .then(res => {
          if (res && res.data) {
            if (res.data.token) {
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('user', JSON.stringify(res.data));
              history.push(`/intakeForm`);
            } else {
              // localStorage.setItem('token', 'abc');
              // localStorage.setItem(
              //   'user',
              //   JSON.stringify({
              //     token: 'abc',
              //     mail: 'abc@aaa.com',
              //     name: 'Anueep',
              //   }),
              // );
              // history.push(`/intakeForm`);
              // alert('Email Addresss not found');
              alert.show('Email Addresss not found', {
                type: 'error',
              });
            }
            setShowLoading(false);
          }
        })
        .catch(err => {
          setShowLoading(false);
          console.log('ERR', err);
        });
      }else {
        alert.show('Please enter valid Email', {
          type: 'error'
        });
      }
    } else {
      alert.show('Please verify that you are a human!', {
        type: 'error'
      });
    }
  };

  const verifyCallback = response => {
    if (response) {
      setIsVerified(true);
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
                  Welcome to the Associate COVID-19 Intake Portal. If you have been diagnosed, believe you have symptoms of COVID-19, or have been exposed to COVID-19 in the last two weeks, please log in to complete the required Intake Form. Your HR Business Partner will contact you shortly after you have completed your intake form. Please enter your Cepheid email address to continue.</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Grid className="loginFormWrapper">
          {showLoading && (
            <Grid className="loader">
              <Loader type="ThreeDots" color="#127AC2" height={80} width={80} />
            </Grid>
          )}
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
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </Grid>
          <Grid className="captcha">
            <Recaptcha
              sitekey="6LfuWcYZAAAAANgiktg3rBoBFW2U4nra4QNFBq9P"
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
