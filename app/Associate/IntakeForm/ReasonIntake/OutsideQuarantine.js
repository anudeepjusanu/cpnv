import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';

const OutsideQuarantine = props => {
  return (
    <React.Fragment>
      <Grid>
        <Formik
          initialValues={{
            desp1: '',
            desp2: '',
          }}
          onSubmit={values => {
            console.log('onsubmit outside qurantine form', values);
            props.handleNext();
          }}
          // validationSchema={schema}
          render={formikBag => (
            <Form onSubmit={formikBag.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item md={5}>
                  <div className="form-control">
                    <TextField
                      id="desp1"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      placeholder="What Cepheid buildings were you in over the last 2 weeks since the time of the exposure, symptom onset or diagnosis? (Including Building #, conference rooms and common areas)"
                    />
                  </div>
                </Grid>
                <Grid item md={5}>
                  <div className="form-control">
                    <TextField
                      id="desp2"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      placeholder="Additional information if needed"
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="text-left-btn tabFormActionTopSpace">
                    <Button
                      type="reset"
                      variant="outlined"
                      color="primary"
                      className="btn medium ml-15"
                      size="large"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className="btn medium ml-15"
                    >
                      Continue
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      </Grid>
    </React.Fragment>
  );
};

export default OutsideQuarantine;
