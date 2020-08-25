import React, { useState, useEffect, useContext } from 'react';
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
  TextareaAutosize
} from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import HelpIcon from '@material-ui/icons/Help';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { updateFormReson } from './../../../services/intakeFormService';
import FormContext from 'FormContext';

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

const Diagnosed = props => {
  const [diagnosedDate, setDiagnosedDate] = useState(null);
  const [exposureDate, setExposureDate] = useState(null);

  const [isSwitchActionEn, setIsSwitchActionEn] = useState(false);
  const {basicInfo, updateFormData} = useContext(FormContext);
  const [buildingName, setBuildingName] = useState('');
  const [additionalInfo, setadditionalInfo] = useState('');
  const handleSwitchChange = () => {
    if (isSwitchActionEn) {
      return setIsSwitchActionEn(false);
    }
    return setIsSwitchActionEn(true);
  };

  const DiagnosedReceived = date => {
    setDiagnosedDate(date);
  };

  const handleDateChange = date => {
    setExposureDate(date);
  };

  return (
    <React.Fragment>
      <Grid>
        <Formik
          initialValues={{
            dateDiagnosisReceived: null,
            dateCovidTest: null,
            desp1: '',
            desp2: '',
          }}
          onSubmit={values => {
            const req = {
              is_positive_diagnosis: isSwitchActionEn? 1:0,
              diagnosis_received_date: diagnosedDate,
              diagnosis_test_date: exposureDate,
              company_buildings: buildingName,
              additional_info: additionalInfo
            }
            updateFormReson(req, basicInfo.intakeId).then(res=>{
              updateFormData('resonForIntake', req);
              props.handleNext();
            }).catch(err=>{
              console.log('errrrrr', err);
            });
          }}
          // validationSchema={schema}
          render={formikBag => (
            <Form onSubmit={formikBag.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid className="remotelyBlk">
                    <Typography
                      variant="body2"
                      gutterBottom
                      className="remotelySwitch"
                    >
                      <Grid className="switchLabelText">Positive diagnosis for COVID-19?</Grid>
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
                  <Grid container spacing={2}>
                    <Grid item md={4} lg={3} sm={6} xs={12} className="datePicker">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="outlined"
                          inputVariant="outlined"
                          format="MM/dd/yyyy"
                          id="dateDiagnosisReceived"
                          label="Date Diagnosis Received"
                          value={diagnosedDate}
                          onChange={DiagnosedReceived}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item md={4} lg={3} sm={6} xs={12} className="datePicker">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="outlined"
                          inputVariant="outlined"
                          format="MM/dd/yyyy"
                          id="dateCovidTest"
                          label="Date of Covid Test"
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
                        <Grid className="textareaHelper">
                          <Typography variant="body2" gutterBottom>What Cepheid buildings were you in over the last 2 weeks since the time of the exposure, symptom onset or diagnosis?</Typography>
                          <span><HelpIcon /></span>
                        </Grid>
                        <TextareaAutosize id="desp1" rowsMin={3} aria-label="empty textarea" className="textarea"  value={buildingName} onChange={e => setBuildingName(e.target.value)}/>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                    <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>Additional information if needed</Typography>
                        <TextareaAutosize id="desp2" rowsMin={3} aria-label="empty textarea" className="textarea" value={additionalInfo} onChange={e => setadditionalInfo(e.target.value)}/>
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
                      onClick={()=>props.handleBack(2)}
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

export default Diagnosed;
