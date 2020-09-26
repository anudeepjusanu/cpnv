import React, { useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  Switch,
  withStyles,
  TextareaAutosize,
} from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import HelpIcon from '@material-ui/icons/Help';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { updateFormReson } from 'services/intakeFormService';

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
  const { caseDetails } = props;
  const [exposureDate, setExposureDate] = useState(
    caseDetails.symptoms_began_date || null,
  );
  const [doctorConsultDate, setDoctorConsultDate] = useState(
    caseDetails.consult_date || null,
  );

  const [isSwitchActionEn, setIsSwitchActionEn] = useState(
    caseDetails.have_consult_doctor == 1 ? true : false,
  );
  const [resporatorySymptoms, setResporatorySymptoms] = useState(
    caseDetails.symptoms_respiratory || '',
  );
  const [buildingName, setBuildingName] = useState(
    caseDetails.company_buildings || '',
  );
  const [additionalInfo, setadditionalInfo] = useState(
    caseDetails.additional_info || '',
  );

  const handleSwitchChange = () => {
    if (isSwitchActionEn) {
      return setIsSwitchActionEn(false);
    }
    return setIsSwitchActionEn(true);
  };

  const handleDateChange = date => {
    setExposureDate(date);
  };

  const fnDoctorConsultDate = date => {
    setDoctorConsultDate(date);
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
            const req = {
              symptoms_began_date: exposureDate,
              symptoms_respiratory: resporatorySymptoms,
              company_buildings: buildingName,
              additional_info: additionalInfo,
              have_consult_doctor: isSwitchActionEn ? 1 : 0,
              consult_date: doctorConsultDate,
              reason: props.reason,
            };
            updateFormReson(req, caseDetails.case_id)
              .then(res => {
                if (res && res.data) {
                  props.handleClose('success');
                }
              })
              .catch(err => {
                console.log('errrrrr', err);
              });
          }}
          // validationSchema={schema}
          render={formikBag => (
            <Form onSubmit={formikBag.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      md={4}
                      lg={3}
                      sm={6}
                      xs={12}
                      className="datePicker"
                    >
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
                          margin="dense"
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                      <div className="form-control textareaWrap">
                        <Grid className="textareaHelper">
                          <Typography variant="body2" gutterBottom>
                            Are you experiencing flu-like or respiratory
                            symptoms?
                          </Typography>
                          <span>
                            <HelpIcon />
                          </span>
                        </Grid>
                        <TextareaAutosize
                          onChange={e => setResporatorySymptoms(e.target.value)}
                          value={resporatorySymptoms}
                          id="desp1"
                          rowsMin={4}
                          aria-label="empty textarea"
                          className="textarea"
                          placeholder="Fever or chills, cough, shortness of breath or difficulty breathing, fatigue, muscle or body aches, headache, new loss of taste or smell, sore throat, congestion or runny nose, nausea or vomiting, diarrhoea"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                      <div className="form-control textareaWrap">
                        <Grid className="textareaHelper">
                          <Typography variant="body2" gutterBottom>
                            What Cepheid buildings were you in over the last 2
                            weeks since the time of the exposure, symptom onset
                            or diagnosis
                          </Typography>
                        </Grid>
                        <TextareaAutosize
                          value={buildingName}
                          onChange={e => setBuildingName(e.target.value)}
                          id="desp2"
                          rowsMin={4}
                          aria-label="empty textarea"
                          className="textarea"
                          placeholder="Including Building #, conference rooms and common areas"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                      <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>
                          Additional information if needed
                        </Typography>
                        <TextareaAutosize
                          value={additionalInfo}
                          onChange={e => setadditionalInfo(e.target.value)}
                          id="desp3"
                          rowsMin={4}
                          aria-label="empty textarea"
                          className="textarea"
                        />
                      </div>
                    </Grid>
                  </Grid>
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
                    <Grid
                      item
                      md={3}
                      lg={3}
                      sm={6}
                      xs={12}
                      className="datePicker"
                    >
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="outlined"
                          inputVariant="outlined"
                          format="MM/dd/yyyy"
                          id="dateOfConsult"
                          label="Date of consult"
                          value={doctorConsultDate}
                          onChange={fnDoctorConsultDate}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          margin="dense"
                        />
                      </MuiPickersUtilsProvider>
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
                      onClick={() => props.handleClose('close')}
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

export default ShowingSymptoms;
