import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, Typography, TextField, TextareaAutosize } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { Formik, Form, ErrorMessage } from 'formik';
import { updateFormReson } from './../../../services/intakeFormService';
import Loader from 'react-loader-spinner';
import FormContext from 'FormContext';
import intakeCircleImg from 'images/IntakeForm-Ring.png';
// import { useAlert } from 'react-alert';

const OutsideQuarantine = props => {
  // const alert = useAlert();
  const {basicInfo, updateFormData, resonForIntake} = useContext(FormContext);

  const [buildingName, setBuildingName] = useState(resonForIntake.company_buildings || '');
  const [additionalInfo, setadditionalInfo] = useState(resonForIntake.additional_info || '');
  const [showLoading, setShowLoading] = useState(false);

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
            desp1: '',
            desp2: '',
          }}
          onSubmit={values => {
            const req = {
              company_buildings: buildingName,
              additional_info: additionalInfo,
              reason: props.reason
            }
            setShowLoading(true);
            updateFormReson(req, basicInfo.intakeId).then(res=>{
              setShowLoading(false);
              updateFormData('resonForIntake', {...req, reson: props.selectedIndex});
              props.handleNext();
              // alert.show('Forms submitted successfully', {
              //   type: 'success',
              // });
            }).catch(err=>{
              setShowLoading(false);
              console.log('error', err);
              // alert.show('Something went wrong!!', {
              //   type: 'error',
              // });
            });
            props.handleNext();
          }}
          // validationSchema={schema}
          render={formikBag => (
            <Form onSubmit={formikBag.handleSubmit}>
              <Grid container spacing={1}>
              <Grid item md={6}>
                  <Grid container spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                      <div className="form-control textareaWrap">
                        <Grid className="textareaHelper">
                          <Typography variant="body2" gutterBottom>What Cepheid buildings were you in over the last 2 weeks since the time of the exposure, symptom onset or diagnosis?</Typography>
                          <span><HelpIcon /></span>
                        </Grid>
                        <TextareaAutosize value={buildingName} onChange={e => setBuildingName(e.target.value)} id="desp1" rowsMin={4} aria-label="empty textarea" className="textarea" placeholder="Including Building #, conference rooms and common areas" />
                      </div>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                      <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>Additional information if needed</Typography>
                        <TextareaAutosize value={additionalInfo} onChange={e => setadditionalInfo(e.target.value)} id="desp2" rowsMin={4} aria-label="empty textarea" className="textarea" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid className="intakeimgWrap">
                    <img src={intakeCircleImg} alt="intake img" className="intakeImg" /> 
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

export default OutsideQuarantine;
