import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Button,
  Link,
  TextField,
  Typography,
  TextareaAutosize,
  Switch,
  withStyles,
} from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import MUIDataTable from 'mui-datatables';
import AssociatesDetailsModal from './AssociatesDetailsModal';
import NonAssociatesDetailsModal from './NonAssociatesDetailsModal';
import ReasonModal from './ReasonModal';
import EmployeDetailsModal from './EmployeDetailsModal';
import {
  GetCaseDetails,
  sendCaseForReview,
  sendFinalAction,
  CloseCase,
} from './../services/HrbpService';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Loader from 'react-loader-spinner';
import { useAlert } from 'react-alert';
import moment from 'moment';
import history from 'utils/history';
import _ from 'lodash';

const HRBPDetail = props => {
  const [openAssociateModal, setOpenAssociateModal] = useState(false);
  const [openNonAssociateModal, setOpenNonAssociateModal] = useState(false);
  const [openReasonModal, setOpenReasonModal] = useState(false);
  const [openEmployeModal, setOpenEmployeModal] = useState(false);
  const [caseDetails, setCaseDetails] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [exposureDate, setExposureDate] = useState(null);
  const [tesResult, setCovidTestResult] = useState(false);
  const [isSwitchActionEn, setIsSwitchActionEn] = useState(false);
  const [associates, setAssociates] = useState([]);
  const [nonAssociates, setNonAssociates] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [caseStatus, setCaseStatus] = useState(
    props.location.state && props.location.state.status,
  );
  const [recommend_actions, setRecommendActions] = useState('');

  const alert = useAlert();

  useEffect(() => {
    getCaseDetails();
  }, []);
  const handleClickOpenAM = () => {
    setOpenAssociateModal(true);
  };
  const handleCloseAM = () => {
    setOpenAssociateModal(false);
  };

  const handleClickOpenNAM = () => {
    setOpenNonAssociateModal(true);
  };
  const handleCloseNAM = () => {
    setOpenNonAssociateModal(false);
  };

  const handleClickOpenReason = () => {
    setOpenReasonModal(true);
  };

  const handleCloseReason = status => {
    if (status === 'success') {
      getCaseDetails();
    }
    setOpenReasonModal(false);
  };

  const handleClickOpenEmploye = () => {
    setOpenEmployeModal(true);
  };

  const handleCloseEmploye = status => {
    if (status === 'success') {
      getCaseDetails();
    }
    setOpenEmployeModal(false);
  };

  const getCaseDetails = () => {
    setShowLoading(true);
    const case_id = props.match.params.case_id;
    GetCaseDetails(case_id)
      .then(res => {
        if (res.data.case.final_test_result) {
          let test_result = res.data.case.final_test_result == 1 ? true : false;
          setCovidTestResult(test_result);
        }
        if (res.data.case.final_quarantine_started) {
          let quarantine =
            res.data.case.final_quarantine_started == 1 ? true : false;
          setIsSwitchActionEn(quarantine);
        }
        if (res.data.case.final_quarantine_start_date) {
          setStartDate(new Date(res.data.case.final_quarantine_start_date));
        }
        if (res.data.case.final_quarantine_end_date) {
          setExposureDate(new Date(res.data.case.final_quarantine_end_date));
        }
        if (res.data.case.final_other_info) {
          setAdditionalInfo(res.data.case.final_other_info);
        }
        setShowLoading(false);
        setCaseDetails(res.data.case);
        if (res.data.case && res.data.case.associates.length) {
          let associate = res.data.case.associates.map(item => {
            item.full_name = item.first_name + ' ' + item.last_name;
            return item;
          });
          setAssociates(associate);
        }
        if (res.data.case && res.data.case.nonassociates.length) {
          let nonAssociate = res.data.case.nonassociates.map(item => {
            item.full_name = item.first_name + ' ' + item.last_name;
            return item;
          });
          setNonAssociates(nonAssociate);
        }
        if (res.data.case && res.data.case.reviews.length) {
          let tempReviews = res.data.case.reviews.map(item => {
            item.added_by =
              item.reviewer_user_name + ' ' + '(' + item.reviewer_type + ')';
            item.created_on = moment(new Date(item.created_on)).format(
              'MM/DD/YYYY HH:mm',
            );
            return item;
          });
          setReviews(tempReviews);
          const hReview = _.find(res.data.case.reviews, function (o) {
            return o.reviewer_type === 'HRM';
          });
          if (hReview) {
            setRecommendActions(hReview.recommend_actions);
          }
        }

        setCaseStatus(res.data.case.case_status);
      })
      .catch(err => {
        setShowLoading(false);
        console.log(err);
      });
  };

  const columns = [
    {
      name: 'added_by',
      label: 'Added By',
    },
    {
      name: 'created_on',
      label: 'Created On',
    },
    {
      name: 'recommend_actions',
      label: 'Recommend Actions',
    },
    {
      name: 'other_preactions',
      label: 'Explanation for recommendation',
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'vertical',
    hasIndex: true,
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 10,
    rowHover: true,
    selectableRows: false,
    fixedHeaderOptions: false,
    print: false,
    download: false,
    filter: false,
    search: false,
    pagination: false,
    viewColumns: false,
  };

  const sendForReview = () => {
    const case_id = props.match.params.case_id;
    let req = {
      review_additional_info: additionalInfo,
    };
    setShowLoading(true);
    sendCaseForReview(req, case_id)
      .then(res => {
        console.log(res);
        setShowLoading(false);
        alert.show('Your comments added successfully', {
          type: 'success',
        });
        history.push({
          pathname: `/hrbp/caseList`,
        });
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false);
        alert.show('Something went wrong!!', {
          type: 'error',
        });
      });
  };

  const handleDateChange = date => {
    setExposureDate(date);
  };

  const handleStartDateChange = date => {
    setStartDate(date);
  };

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

  const handleSwitchChange = () => {
    if (isSwitchActionEn) {
      return setIsSwitchActionEn(false);
    }
    return setIsSwitchActionEn(true);
  };

  const covidTestResult = () => {
    if (tesResult) {
      return setCovidTestResult(false);
    }
    return setCovidTestResult(true);
  };

  const submitFinalAction = () => {
    let req = {
      final_test_result: tesResult,
      final_quarantine_started: isSwitchActionEn,
      final_quarantine_start_date: startDate,
      final_quarantine_end_date: exposureDate,
      final_other_info: additionalInfo,
    };
    const case_id = props.match.params.case_id;
    setShowLoading(true);
    sendFinalAction(req, case_id)
      .then(res => {
        setShowLoading(false);
        history.push({
          pathname: `/hrbp/caseList`,
        });
      })
      .catch(err => {
        setShowLoading(false);
        console.log(err);
      });
  };

  const fnCloseCase = () => {
    const case_id = props.match.params.case_id;
    setShowLoading(true);
    CloseCase(case_id)
      .then(res => {
        console.log(res);
        setShowLoading(false);
        alert.show('Case removed successfully', {
          type: 'success',
        });
        history.push({
          pathname: `/hrbp/caseList`,
        });
      })
      .catch(err => {
        setShowLoading(false);
        alert.show('Something went wrong!!', {
          type: 'error',
        });
        console.log(err);
      });
  };

  return (
    <React.Fragment>

      {showLoading && (
        <Grid className="loader">
          <Loader type="ThreeDots" color="#127AC2" height={80} width={80} />
        </Grid>
      )}
      <Grid className="wrapper">
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={12}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Associate Details
            </Typography>
            <Grid className="employeDetail">
              {caseStatus != 'Case Closed' && (
                <Link
                  className="linkAction"
                  color="secondary"
                  onClick={handleClickOpenEmploye}
                >
                  Edit
                </Link>
              )}
              <Typography variant="h6" className="content_title">
                Associate Info
              </Typography>
              <Grid className="detailsList">
                <Typography variant="body1" gutterBottom>
                  {caseDetails.first_name + ' ' + caseDetails.last_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {caseDetails.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {caseDetails.mobile}
                </Typography>
              </Grid>
              <Grid className="detailsList">
                <Typography variant="h6" gutterBottom>
                  Department:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {caseDetails.department_name}
                </Typography>
              </Grid>
              <Grid className="detailsList">
                <Typography variant="h6" gutterBottom>
                  Emergency Contact:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {caseDetails.emergency_conatct}
                </Typography>
              </Grid>
              <Grid className="detailsList">
                <Typography variant="h6" gutterBottom>
                  Address:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {caseDetails.address}
                </Typography>
              </Grid>
              <Typography variant="h6" className="content_title">
                Working at Office:
              </Typography>
              <Grid className="detailsList">
                <Typography variant="h6" gutterBottom>
                  Building Name:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {caseDetails.building_name}
                </Typography>
              </Grid>
              <Grid className="detailsList">
                <Typography variant="h6" gutterBottom>
                  Area:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {caseDetails.area}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={3} sm={12}>
            <Typography variant="h5" color="secondary" gutterBottom>
              Reason
            </Typography>
            <Grid className="reason">
              {caseDetails.case_status != 'Case Closed' && (
                <Link
                  className="linkAction"
                  color="secondary"
                  onClick={handleClickOpenReason}
                >
                  Edit
                </Link>
              )}
              <Grid className="detailsList">
                <Typography variant="h6" gutterBottom>
                  Reason for Intake
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {caseDetails.reason}
                </Typography>
              </Grid>
              {caseDetails.reason === 'Exposed' && (
                <React.Fragment>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Date of Exposure
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {moment(new Date(caseDetails.exposure_date)).format('MM/DD/YYYY HH:mm')}
                      {/* {caseDetails.exposure_date} */}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Please describe the circumstances of exposure.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.exposure_describe}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      What Cepheid buildings were you in over the last 2 weeks
                      since the time of the exposure, symptom onset or
                      diagnosis?
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.company_buildings}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Additional information if needed
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.additional_info}
                    </Typography>
                  </Grid>
                </React.Fragment>
              )}
              {caseDetails.reason === 'Symptoms' && (
                <React.Fragment>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Date of Symptoms Began
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {moment(new Date(caseDetails.symptoms_began_date)).format('MM/DD/YYYY HH:mm')}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Please describe the Symptoms
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.symptoms_respiratory}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      What Cepheid buildings were you in over the last 2 weeks
                      since the time of the exposure, symptom onset or
                      diagnosis?
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.company_buildings}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Additional information if needed
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.additional_info}
                    </Typography>
                  </Grid>

                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Have you been to a doctor?
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.have_consult_doctor == 1 ? 'Yes' : 'No'}
                    </Typography>
                  </Grid>
                  {caseDetails.have_consult_doctor == 1 && (
                    <Grid className="detailsList">
                      <Typography variant="h6" gutterBottom>
                        Date of Consult
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {moment(new Date(caseDetails.consult_date)).format('MM/DD/YYYY')}
                        {/* {caseDetails.consult_date} */}
                      </Typography>
                    </Grid>
                  )}
                </React.Fragment>
              )}
              {caseDetails.reason === 'Diagnosed' && (
                <React.Fragment>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Positive diagnosis for COVID-19?
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.is_positive_diagnosis == 1 ? 'Yes' : 'No'}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Diagnosis Received Date
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {moment(new Date(caseDetails.diagnosis_received_date)).format('MM/DD/YYYY')}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Date of Covid Test
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {moment(new Date(caseDetails.diagnosis_test_date)).format('MM/DD/YYYY')}
                    </Typography>
                  </Grid>

                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      What Cepheid buildings were you in over the last 2 weeks
                      since the time of the exposure, symptom onset or
                      diagnosis?
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.company_buildings}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Additional information if needed
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.additional_info}
                    </Typography>
                  </Grid>
                </React.Fragment>
              )}
              {caseDetails.reason === 'Quarantine' && (
                <React.Fragment>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      What Cepheid buildings were you in over the last 2 weeks
                      since the time of the exposure, symptom onset or
                      diagnosis?
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.company_buildings}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Additional information if needed
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.additional_info}
                    </Typography>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </Grid>

          {caseStatus == 'New' && (
            <Grid item lg={6} md={6} sm={12}>
              <Typography variant="h5" color="secondary" gutterBottom>
                Review
              </Typography>
              <Grid item md={6}>
                <div className="form-control textareaWrap mb-10">
                  <Typography variant="body2" gutterBottom>
                    Additional Information
                  </Typography>
                  <TextareaAutosize
                    value={additionalInfo}
                    onChange={e => setAdditionalInfo(e.target.value)}
                    id="desp"
                    rowsMin={3}
                    aria-label="empty textarea"
                    className="textarea"
                  />
                </div>
              </Grid>

              <Grid item xs={6} className="action_mob_fix">
                <div className="">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className="btn medium continue_action"
                    onClick={sendForReview}
                  >
                    Request for Review
                  </Button>
                </div>
              </Grid>
            </Grid>
          )}

          {(caseStatus == 'Final Action' || caseStatus == 'HRM Reviewed' || caseStatus == 'Case Closed') && (
            <Grid item lg={6} md={6} sm={12}>
              {recommend_actions !== 'No Action' && (
                <Typography variant="h5" color="secondary" gutterBottom>
                  Final Action
                </Typography>
              )}
              <Grid container>
                {recommend_actions !== 'No Action' && (
                  <Grid item lg={8} md={12} sm={12} xs={12}>
                    <Formik
                      initialValues={{}}
                      onSubmit={values => { }}
                      render={formikBag => (
                        <Form onSubmit={formikBag.handleSubmit}>
                          <Grid container spacing={2}>
                            <Grid item md={12}>
                              <Grid container>
                                <Grid item md={12}>
                                  <Typography
                                    variant="body2"
                                    gutterBottom
                                    className="remotelySwitch switch"
                                  >
                                    <Grid className="switchLabelText">
                                      Covid-19 Test Results
                                    </Grid>
                                    <Typography
                                      component="div"
                                      className="switchWrap"
                                    >
                                      <Grid
                                        component="label"
                                        container
                                        alignItems="center"
                                        spacing={1}
                                      >
                                        <Grid item className="switchLabel">
                                          Negative
                                        </Grid>
                                        <Grid item>
                                          <IOSSwitch
                                            checked={tesResult}
                                            onChange={covidTestResult}
                                            name="remotely"
                                            inputProps={{
                                              'aria-label':
                                                'secondary checkbox',
                                            }}
                                            disabled={
                                              (caseStatus == 'Final Action' || caseStatus == 'Case Closed')
                                            }
                                          />
                                        </Grid>
                                        <Grid item className="switchLabel">
                                          Positive
                                        </Grid>
                                      </Grid>
                                    </Typography>
                                  </Typography>
                                </Grid>
                                <Grid item md={12}>
                                  <Typography
                                    variant="body2"
                                    gutterBottom
                                    className="remotelySwitch switch"
                                  >
                                    <Grid className="switchLabelText">
                                      Quarantine Started?
                                    </Grid>
                                    <Typography
                                      component="div"
                                      className="switchWrap"
                                    >
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
                                              'aria-label':
                                                'secondary checkbox',
                                            }}
                                            disabled={
                                              (caseStatus == 'Final Action' || caseStatus == 'Case Closed')
                                            }
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
                            </Grid>
                            <Grid
                              item
                              md={6}
                              lg={6}
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
                                  label="Start Date"
                                  value={startDate}
                                  onChange={handleStartDateChange}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  margin="dense"
                                  disabled={
                                    (caseStatus == 'Final Action' || caseStatus == 'Case Closed' || !isSwitchActionEn)
                                  }
                                />
                              </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid
                              item
                              md={6}
                              lg={6}
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
                                  label="End Date"
                                  value={exposureDate}
                                  onChange={handleDateChange}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  margin="dense"
                                  disabled={
                                    (caseStatus == 'Final Action' || caseStatus == 'Case Closed' || !isSwitchActionEn)
                                  }
                                />
                              </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item md={12}>
                              <div className="form-control textareaWrap">
                                <Typography variant="body2" gutterBottom>
                                  Additional Information
                                </Typography>
                                <TextareaAutosize
                                  value={additionalInfo}
                                  onChange={e =>
                                    setAdditionalInfo(e.target.value)
                                  }
                                  id="desp"
                                  rowsMin={3}
                                  aria-label="empty textarea"
                                  className="textarea"
                                  disabled={
                                    (caseStatus == 'Final Action' || caseStatus == 'Case Closed')
                                  }
                                />
                              </div>
                            </Grid>
                            <Grid item xs={12} className="action_mob_fix">
                              <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                              >
                                <Grid>
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    className="btn medium continue_action"
                                    onClick={submitFinalAction}
                                    disabled={
                                      (caseStatus == 'Final Action' || caseStatus == 'Case Closed')
                                    }
                                  >
                                    Submit
                                  </Button>
                                </Grid>
                                <Grid className="noteWidth ml-10">
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    className="btn medium continue_action mb-10"
                                    onClick={fnCloseCase}
                                    disabled={
                                      (caseStatus == 'Case Closed')
                                    }
                                  >
                                    Close Case
                                  </Button>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    Note: once you close the case, you can't
                                    access the case information
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    />
                  </Grid>
                )}

                {recommend_actions == 'No Action' && (
                  <Grid item md={12}>
                    <React.Fragment>
                      <Typography variant="h5" color="secondary" gutterBottom>
                        Close Case
                      </Typography>
                      <Grid item xs={12} className="action_mob_fix">
                        <div className="">
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            size="large"
                            className="btn medium continue_action mb-10"
                            onClick={fnCloseCase}
                          >
                            Close Case
                          </Button>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Note: once you close the case, you can't access the
                            case information
                          </Typography>
                        </div>
                      </Grid>
                    </React.Fragment>
                  </Grid>
                )}

                <Grid item md={12}>
                  <Grid className="tableListDetails">
                    <Typography variant="h5" color="secondary" gutterBottom>
                      Recommend Action
                    </Typography>
                    <Grid className="dynamicTableWrap">
                      <MUIDataTable
                        data={reviews}
                        columns={columns}
                        options={options}
                        className="dynamicTable"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={12}>
                  <Grid className="tableListDetails">
                    <Typography variant="h5" color="secondary" gutterBottom>
                      Child Cases
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <Grid className="listCard">
                          <Link color="primary" onClick={handleClickOpenAM}>
                            Associates Details
                          </Link>
                        </Grid>
                      </Grid>
                      <Grid item md={6}>
                        <Grid className="listCard">
                          <Link color="primary" onClick={handleClickOpenNAM}>
                            Non-Associates Details
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      {openAssociateModal && (
        <AssociatesDetailsModal
          handleClose={handleCloseAM}
          open={openAssociateModal}
          data={associates}
          case_id={props.match.params.case_id}
          status={props.location && props.location.state ? props.location.state.status : ''}
        />
      )}
      {openNonAssociateModal && (
        <NonAssociatesDetailsModal
          handleClose={handleCloseNAM}
          open={openNonAssociateModal}
          data={nonAssociates}
        />
      )}
      {openReasonModal && (
        <ReasonModal
          handleClose={handleCloseReason}
          open={openReasonModal}
          caseDetails={caseDetails}
        />
      )}
      {openEmployeModal && (
        <EmployeDetailsModal
          handleClose={handleCloseEmploye}
          open={openEmployeModal}
          caseDetails={caseDetails}
        />
      )}
    </React.Fragment>
  );
};

export default HRBPDetail;
