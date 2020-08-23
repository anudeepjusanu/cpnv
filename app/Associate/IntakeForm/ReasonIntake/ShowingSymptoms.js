import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Switch,
  withStyles,
} from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.secondary.dark,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const ShowingSymptoms = props => {
  const [exposureDate, setExposureDate] = useState(null);
  const [isSwitchActionEn, setIsSwitchActionEn] = useState(false);

  const handleSwitchChange = () => {
    if (isSwitchActionEn) {
      return setIsSwitchActionEn(false);
    }
    return setIsSwitchActionEn(true);
  };

  const handleDateChange = date => {
    setExposureDate(date);
  };

  return (
    <React.Fragment>
      <Grid>
        <Formik
          initialValues={{
            dateSymptomsBegan: null,
            dateOfConsult: null,
            desp1: '',
            desp2: '',
            desp3: '',
          }}
          onSubmit={values => {
            console.log('onsubmit showing symptoms form', values);
            props.handleNext();
          }}
          // validationSchema={schema}
          render={formikBag => (
            <Form onSubmit={formikBag.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={3} className="datePicker">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="outlined"
                          inputVariant="outlined"
                          format="MM/dd/yyyy"
                          id="dateSymptomsBegan"
                          label="Date Symptoms Began"
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
                <Grid item md={5}>
                  <div className="form-control">
                    <TextField
                      id="desp1"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      placeholder="Are you experiencing flu-like or respiratory symptoms? ((fever or chills, cough, shortness of breath or difficulty breathing, fatigue, muscle or body aches, headache, new loss of taste or smell, sore throat, congestion or runny nose, nausea or vomiting, diarrhea)"
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
                      placeholder="What Cepheid buildings were you in over the last 2 weeks since the time of the exposure, symptom onset or diagnosis? (Including Building #, conference rooms and common areas)"
                    />
                  </div>
                </Grid>
                <Grid item md={5}>
                  <div className="form-control">
                    <TextField
                      id="desp3"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      placeholder="Additional information if needed"
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Grid className="remotelyBlk">
                    <Typography
                      variant="body2"
                      gutterBottom
                      className="remotelySwitch"
                    >
                      Have you been to a doctor?
                      <Typography component="div" className="switchWrap">
                        <Grid
                          component="label"
                          container
                          alignItems="center"
                          spacing={1}
                        >
                          <Grid item className="switchLabel">
                            No
                          </Grid>
                          <Grid item>
                            <IOSSwitch
                              checked={isSwitchActionEn}
                              onChange={handleSwitchChange}
                              name="remotely"
                              inputProps={{
                                'aria-label': 'secondary checkbox',
                              }}
                            />
                          </Grid>
                          <Grid item className="switchLabel">
                            Yes
                          </Grid>
                        </Grid>
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={3} className="datePicker">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="outlined"
                          inputVariant="outlined"
                          format="MM/dd/yyyy"
                          id="dateOfConsult"
                          label="Date of consult"
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

export default ShowingSymptoms;
