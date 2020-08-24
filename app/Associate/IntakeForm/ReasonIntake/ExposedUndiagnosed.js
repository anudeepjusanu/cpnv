import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Typography, TextareaAutosize } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import HelpIcon from '@material-ui/icons/Help';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const ExposedUndiagnosed = props => {
  const [exposureDate, setExposureDate] = useState(null);

  const handleDateChange = date => {
    setExposureDate(date);
  };

  return (
    <React.Fragment>
      <Grid>
        <Formik
          initialValues={{
            dateExposure: null,
            desp1: '',
            desp2: '',
            desp3: '',
          }}
          onSubmit={values => {
            console.log('onsubmit exposed form', values);
            props.handleNext();
          }}
          // validationSchema={schema}
          render={formikBag => (
            <Form onSubmit={formikBag.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} lg={3} sm={5} xs={12} className="datePicker">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="outlined"
                          inputVariant="outlined"
                          format="MM/dd/yyyy"
                          id="dateExposure"
                          label="Date of Exposure"
                          value={exposureDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                      <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>Please describe the circumstances of exposure</Typography>
                        <TextareaAutosize id="desp1" rowsMin={3} aria-label="empty textarea" className="textarea" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                      <div className="form-control textareaWrap">
                        <Grid className="textareaHelper">
                          <Typography variant="body2" gutterBottom>What Cepheid buildings were you in over the last 2 weeks since the time of the exposure, symptom onset or diagnosis?</Typography>
                          <span><HelpIcon /></span>
                        </Grid>
                        <TextareaAutosize id="desp2" rowsMin={3} aria-label="empty textarea" className="textarea" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                    <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>Additional information if needed</Typography>
                        <TextareaAutosize id="desp3" rowsMin={3} aria-label="empty textarea" className="textarea" />
                      </div>
                    </Grid>
                  </Grid>
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
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className="btn medium ml-15 continue_action"
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

export default ExposedUndiagnosed;
