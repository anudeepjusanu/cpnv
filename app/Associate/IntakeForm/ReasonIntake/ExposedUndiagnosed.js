import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, TextField, Typography, TextareaAutosize } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import HelpIcon from '@material-ui/icons/Help';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { updateFormReson } from './../../../services/intakeFormService';
import Loader from 'react-loader-spinner';
import FormContext from 'FormContext';
// import intakeCircleImg from 'images/IntakeForm-Ring.png';

const ExposedUndiagnosed = props => {
  const {basicInfo, updateFormData, resonForIntake} = useContext(FormContext);
  const [exposureDate, setExposureDate] = useState(resonForIntake.exposure_date || null);
  const [eDesc, setExposureDescribe] = useState(resonForIntake.exposure_describe || '');
  const [buildingName, setBuildingName] = useState(resonForIntake.company_buildings || '');
  const [additionalInfo, setadditionalInfo] = useState(resonForIntake.additional_info || '');
  const [showLoading, setShowLoading] = useState(false);

  const handleDateChange = date => {
    setExposureDate(date);
  };

  return (
    <React.Fragment>
      {showLoading && (
          <Grid className="loader">
              <Loader type="ThreeDots" color="#127AC2" height={80} width={80} />
          </Grid>
      )}
      <Grid>
        <Formik
          initialValues={{
            dateExposure: null,
            desp1: '',
            desp2: '',
            desp3: '',
          }}
          onSubmit={values => {
            const req = {
              exposure_date: exposureDate,
              exposure_describe: eDesc,
              company_buildings: buildingName,
              additional_info: additionalInfo,
              reason: props.reason
            }
            setShowLoading(true);
            updateFormReson(req, basicInfo.intakeId).then(res=>{
              setShowLoading(false);
              updateFormData('resonForIntake', {...req, reson: props.selectedIndex});
            }).catch(err=>{
              setShowLoading(false);
              console.log('errrrrr', err);
            });
            props.handleNext();
          }}
          // validationSchema={schema}
          render={formikBag => (
            <Form onSubmit={formikBag.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item md={12} lg={6} sm={6} xs={12} className="datePicker">
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
                          margin="dense"
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    
                    <Grid item md={12} sm={12} xs={12}>
                      <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>Please describe in detail circumstances of the exposure including where you were, was Personal Protective equipment (PPE) worn, how do you know you were exposed? </Typography>
                        <TextareaAutosize id="desp1" rowsMin={3} aria-label="empty textarea" className="textarea" onChange={e=>setExposureDescribe(e.target.value)} value={eDesc}/>
                      </div>
                    </Grid>
                  
                    <Grid item md={12} sm={12} xs={12}>
                      <div className="form-control textareaWrap">
                        <Grid className="textareaHelper">
                          <Typography variant="body2" gutterBottom>What Cepheid buildings were you in over the last 2 weeks since the time of the exposure, symptom onset or diagnosis?</Typography>
                        </Grid>
                        <TextareaAutosize id="desp2" rowsMin={3} aria-label="empty textarea" className="textarea" value={buildingName} onChange={e => setBuildingName(e.target.value)}/>
                      </div>
                    </Grid>
                 
                    <Grid item md={12} sm={12} xs={12}>
                      <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>Additional information if needed</Typography>
                        <TextareaAutosize id="desp3" rowsMin={3} aria-label="empty textarea" className="textarea" value={additionalInfo} onChange={e => setadditionalInfo(e.target.value)}/>
                      </div>
                    </Grid>
                
                  </Grid>
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <Grid className="intakeimgWrap">
                    <img src={intakeCircleImg} alt="intake img" className="intakeImg" /> 
                  </Grid>
                </Grid> */}
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
                      Go Back
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
