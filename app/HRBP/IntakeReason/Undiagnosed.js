import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography,
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

const ExposedUndiagnosed = props => {
  const { caseDetails } = props;
  const [exposureDate, setExposureDate] = useState(
    caseDetails.exposure_date || null,
  );
  const [eDesc, setExposureDescribe] = useState(
    caseDetails.exposure_describe || '',
  );
  const [buildingName, setBuildingName] = useState(
    caseDetails.company_buildings || '',
  );
  const [additionalInfo, setadditionalInfo] = useState(
    caseDetails.additional_info || '',
  );

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
            const req = {
              exposure_date: exposureDate,
              exposure_describe: eDesc,
              company_buildings: buildingName,
              additional_info: additionalInfo,
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
            props.handleNext();
          }}
          // validationSchema={schema}
          render={formikBag => (
            <Form onSubmit={formikBag.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      md={5}
                      lg={3}
                      sm={5}
                      xs={12}
                      className="datePicker"
                    >
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
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item md={5} sm={6} xs={12}>
                      <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>
                          Please describe the circumstances of exposure
                        </Typography>
                        <TextareaAutosize
                          id="desp1"
                          rowsMin={3}
                          aria-label="empty textarea"
                          className="textarea"
                          onChange={e => setExposureDescribe(e.target.value)}
                          value={eDesc}
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
                          id="desp2"
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
                      <div className="form-control textareaWrap">
                        <Typography variant="body2" gutterBottom>
                          Additional information if needed
                        </Typography>
                        <TextareaAutosize
                          id="desp3"
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

export default ExposedUndiagnosed;
