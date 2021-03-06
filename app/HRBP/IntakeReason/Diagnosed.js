import React, { useState, useEffect } from 'react';
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
import { truncate } from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getSymptoms } from './../../services/intakeFormService'; 

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
  console.log(props)
  const { caseDetails } = props;
  const [diagnosedDate, setDiagnosedDate] = useState(
    caseDetails.diagnosis_received_date || null,
  );
  const [exposureDate, setExposureDate] = useState(
    caseDetails.diagnosis_test_date || null,
  );

  const [isSwitchActionEn, setIsSwitchActionEn] = useState(
    caseDetails.is_positive_diagnosis == 1 ? true : false,
  );
  const [buildingName, setBuildingName] = useState(
    caseDetails.company_buildings || '',
  );
  const [additionalInfo, setadditionalInfo] = useState(
    caseDetails.additional_info || '',
  );
  const [employee_symptoms, setsymptoms] = useState(caseDetails.employee_symptoms || '');
  const [symptomsList, setSymptomsList] = useState(props.symptoms || []);
  const [selectedSymptoms, selectSymptoms] = useState(caseDetails.employee_symptoms || []);

  useEffect(() => {
    getSymptomsList();
  },[])

  const getSymptomsList = () => {
    getSymptoms().then(res=>{
      console.log(res)
      let Symptoms = res.data.symptoms.map(( symptom ) => symptom.symptom_name);
      setSymptomsList(Symptoms);
    }).catch(err=>console.log(err))
  }
  
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

  const handleChange = (e) => {
    if(selectedSymptoms.includes(e.target.value)){
      let tempSymptoms = [...selectedSymptoms];
      tempSymptoms = tempSymptoms.filter((n) => {return n != e.target.value});
      selectSymptoms([...tempSymptoms]);
    } else {
      let tempSymptoms = [...selectedSymptoms];
      tempSymptoms.push(e.target.value);
      selectSymptoms([...tempSymptoms]);
    }
  }

  return (
    <React.Fragment>  
      <Grid>
        <Formik
          initialValues={{
            dateDiagnosisReceived: null,
            dateCovidTest: null,
            desp1: '',
            desp2: '',
            employee_symptoms: ''
          }}
          onSubmit={values => {
            const req = {
              is_positive_diagnosis: isSwitchActionEn ? 1 : 0,
              diagnosis_received_date: diagnosedDate,
              diagnosis_test_date: exposureDate,
              company_buildings: buildingName,
              additional_info: additionalInfo,
              reason: props.reason,
              employee_symptoms: selectedSymptoms
            };
            updateFormReson(req, caseDetails.case_id)
              .then(res => {
                props.handleClose('success');
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
                  <Grid className="remotelyBlk">
                    <Typography
                      variant="body2"
                      gutterBottom
                      className="remotelySwitch"
                    >
                      <Grid className="switchLabelText">
                        Positive diagnosis for COVID-19?
                      </Grid>
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
                          id="dateDiagnosisReceived"
                          label="Date Diagnosis Received"
                          value={diagnosedDate}
                          onChange={DiagnosedReceived}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          margin="dense"
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
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
                          id="dateCovidTest"
                          label="Date of Covid Test"
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
                            What Cepheid buildings were you in over the last 2
                            weeks since the time of the exposure, symptom onset
                            or diagnosis
                          </Typography>
                        </Grid>
                        <TextareaAutosize
                          id="desp1"
                          rowsMin={3}
                          aria-label="empty textarea"
                          className="textarea"
                          value={buildingName}
                          onChange={e => setBuildingName(e.target.value)}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                    {/* <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>Are you experiencing flu-like or respiratory symptoms?</Typography>
                        <TextareaAutosize placeholder="Fever or chills, cough, shortness of breath or difficulty breathing, fatigue, muscle or body aches, headache, new loss of taste or smell, sore throat, congestion or runny nose, nausea or vomiting, diarrhoea" id="desp2" rowsMin={3} aria-label="empty textarea" className="textarea" value={employee_symptoms} onChange={e => setsymptoms(e.target.value)}/>
                      </div> */}
                      <Grid item md={12} sm={12} xs={12} >
                    <Typography variant="body2" gutterBottom>Are you experiencing flu-like or respiratory symptoms?</Typography>
                      <Grid container spacing={3}>
                      { symptomsList.map((symptom)=>
                      <Grid item md={6} sm={6} xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedSymptoms.includes(symptom)}
                              onChange={(e) => handleChange(e)}
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label={symptom}
                          value={symptom}
                        />
                      </Grid>
                      )}
                      </Grid>
                    </Grid>
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
                          id="desp2"
                          rowsMin={3}
                          aria-label="empty textarea"
                          className="textarea"
                          value={additionalInfo}
                          onChange={e => setadditionalInfo(e.target.value)}
                        />
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

export default Diagnosed;
