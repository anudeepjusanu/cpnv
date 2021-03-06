import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { Formik, Form, ErrorMessage } from 'formik';
import { useAlert } from 'react-alert'
import { updateFormReson } from 'services/intakeFormService';

const OutsideQuarantine = props => {
  const alert = useAlert()
  const { caseDetails } = props;
  const [buildingName, setBuildingName] = useState(
    caseDetails.company_buildings || '',
  );
  const [additionalInfo, setadditionalInfo] = useState(
    caseDetails.additional_info || '',
  );

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
              additional_info: additionalInfo,
              reason: props.reason,
            };
            updateFormReson(req, caseDetails.case_id)
              .then(res => {
                props.handleClose('success');
                alert.show('Intake form submitted successfully', {
                  type: 'success',
                });
              })
              .catch(err => {
                console.log('error', err);
                alert.show('something went wrong!!', {
                  type: 'error',
                });
              });
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
                          <Typography variant="body2" gutterBottom>
                            What Cepheid buildings were you in over the last 2
                            weeks since the time of the exposure, symptom onset
                            or diagnosis
                          </Typography>
                        </Grid>
                        <TextareaAutosize
                          value={buildingName}
                          onChange={e => setBuildingName(e.target.value)}
                          id="desp1"
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
                          id="desp2"
                          rowsMin={4}
                          aria-label="empty textarea"
                          className="textarea"
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

export default OutsideQuarantine;
