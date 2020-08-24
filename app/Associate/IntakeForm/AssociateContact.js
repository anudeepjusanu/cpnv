import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Typography,
  Switch,
  withStyles,
} from '@material-ui/core';
import AssociateContactForm from './AssociateContactForm';

const AssociateContact = (props) => {
  return (
    <React.Fragment>
      <Grid container className="stepperSpace">
        <Grid item md={11}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Who, if anyone, have you been in contact with at Cepheid over the last 2 weeks since the time of the exposure, symptom onset or diagnosis?
              </Typography>
              <AssociateContactForm />
            </Grid>
            <Grid item xs={12} className="action_mob_fix">
              <div className="text-left-btn tabFormActionTopSpace">
                <Button
                  type="reset"
                  variant="outlined"
                  color="primary"
                  className="btn medium cancel_action"
                  size="large"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  size="large"
                  className="btn medium ml-15 continue_action"
                  onClick={() => {props.handleNext('associateContact')}}
                >
                  Continue
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AssociateContact;
