import React, { Fragment, useState, useContext } from 'react';
import { Typography, Button, Grid } from '@material-ui/core';

const IntakeFormSuccess = props => {
  console.log('success props');
  return (
    <React.Fragment>
      <Grid className="successWrapper">
        <Typography variant="h3" gutterBottom>
          Thank you.
        </Typography>
        <Typography variant="body2" gutterBottom>
          You have submitted the form successfully. Your HR Business Partner will contact you regarding your completed intake form shortly. If you are not feeling well, or if you believe you have been exposed to COVID-19, please stay at home and contact your direct supervisor.
        </Typography>
      </Grid>
    </React.Fragment>
  );
};

export default IntakeFormSuccess;
