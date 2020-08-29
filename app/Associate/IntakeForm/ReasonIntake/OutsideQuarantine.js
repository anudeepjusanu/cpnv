import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, Typography, TextField, TextareaAutosize } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { Formik, Form, ErrorMessage } from 'formik';
import { updateFormReson } from './../../../services/intakeFormService';
import FormContext from 'FormContext';

const OutsideQuarantine = props => {
  const {basicInfo, updateFormData, resonForIntake} = useContext(FormContext);

  const [buildingName, setBuildingName] = useState(resonForIntake.company_buildings || '');
  const [additionalInfo, setadditionalInfo] = useState(resonForIntake.additional_info || '');

  return (
    <React.Fragment>
      <Grid>
        <Formik
          initialValues={{
            desp1: '',
            desp2: '',
          }}
          onSubmit={values => {
            const req = {
              company_buildings: buildingName,
              additional_info: additionalInfo
            }
            updateFormReson(req, basicInfo.intakeId).then(res=>{
              updateFormData('resonForIntake', {...req, reson: props.selectedIndex});
              props.handleNext();
            }).catch(err=>{
              console.log('error', err);
            });
            props.handleNext();
          }}
          // validationSchema={schema}
          render={formikBag => (
            <Form onSubmit={formikBag.handleSubmit}>
              <Grid container spacing={1}>
              <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                      <div className="form-control textareaWrap">
                        <Grid className="textareaHelper">
                          <Typography variant="body2" gutterBottom>What Cepheid buildings were you in over the last 2 weeks since the time of the exposure, symptom onset or diagnosis?</Typography>
                          <span><HelpIcon /></span>
                        </Grid>
                        <TextareaAutosize value={buildingName} onChange={e => setBuildingName(e.target.value)} id="desp1" rowsMin={4} aria-label="empty textarea" className="textarea" placeholder="Including Building #, conference rooms and common areas" />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                    <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>Additional information if needed</Typography>
                        <TextareaAutosize value={additionalInfo} onChange={e => setadditionalInfo(e.target.value)} id="desp2" rowsMin={4} aria-label="empty textarea" className="textarea" />
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

export default OutsideQuarantine;
