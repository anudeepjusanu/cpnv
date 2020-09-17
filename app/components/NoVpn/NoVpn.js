import React from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import Logo from 'images/Cepheid-logo-white.svg';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';

const NoVpn = () => {
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
          <Grid className="noAccessIcon">
            <NetworkCheckIcon />
          </Grid>
          <Typography variant="h5" gutterBottom>
            Oops! It seems you are not connected to the CEPHEID Network. Please
            connect to the network and refresh the page to proceed further.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NoVpn;
