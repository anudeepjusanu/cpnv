import React, { useEffect } from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import Logo from 'images/Cepheid-logo-white.svg';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';

const NoAccess = () => {
  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('okta-token-storage');
    localStorage.removeItem('okta-cache-storage');
    localStorage.removeItem('okta-pkce-storage');
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
        <Grid className="loginFormWrapper access">
          <Grid className="noAccessIcon" />
          <Typography variant="h5" gutterBottom>
            Oops! It seems you don't access to the application
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NoAccess;