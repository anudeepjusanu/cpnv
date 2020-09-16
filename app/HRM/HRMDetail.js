import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Select,
  Button,
  Link,
  TextField,
  Typography,
  TextareaAutosize,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import MUIDataTable from 'mui-datatables';
import AssociatesDetailsModal from './AssociatesDetailsModal';
import NonAssociatesDetailsModal from './NonAssociatesDetailsModal';
import ReasonModal from './ReasonModal';
import EmployeDetailsModal from '../HRBP/EmployeDetailsModal';
import Loader from 'react-loader-spinner';
import { GetCaseDetails, sendHrmReview } from './../services/HrmService';
import moment from 'moment';
import history from 'utils/history';

const HRMDetail = props => {
  const [openAssociateModal, setOpenAssociateModal] = useState(false);
  const [openNonAssociateModal, setOpenNonAssociateModal] = useState(false);
  const [openReasonModal, setOpenReasonModal] = useState(false);
  const [caseDetails, setCaseDetails] = useState({});
  const [action, setAction] = useState('');
  const [otherPrecautions, setOtherPrecautions] = useState('');
  const [openEmployeModal, setOpenEmployeModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [associates, setAssociates] = useState([]);
  const [nonAssociates, setNonAssociates] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    getCaseDetails();
  }, []);

  const getCaseDetails = () => {
    const case_id = props.match.params.case_id;
    setShowLoading(true);
    GetCaseDetails(case_id)
      .then(res => {
        setShowLoading(false);
        setCaseDetails(res.data.case);
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
        }
          if (res.data.case && res.data.case.associates.length) {
            let associate = res.data.case.associates.map(item => {
              item.full_name = item.first_name + ' ' + item.last_name;
              return item;
            });
            setAssociates(associate);
          }
          if (res.data.case && res.data.case.nonassociates.length) {
            setNonAssociates(res.data.case.nonassociates);
          }
      })
      .catch(err => {
        setShowLoading(false);
        console.log(err);
      });
  };

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
      label: 'Other Precautions',
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

  const handleChangeDepartment = event => {
    setAction(event.target.value);
  };

  const ActionList = [
    {
      label: 'Quarantine + Testing',
      value: 'Quarantine + Testing',
    },
    {
      label: 'Quarantine',
      value: 'Quarantine',
    },
    {
      label: 'No Action',
      value: 'No Action',
    },
  ];

  const fnSendHrmReview = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    const req = {
      reviewer_user_email: user.email,
      recommend_actions: action,
      other_preactions: otherPrecautions,
    };
    const case_id = props.match.params.case_id;
    setShowLoading(true);
    sendHrmReview(req, case_id)
      .then(res => {
        setShowLoading(false);
        history.push(`/hrm/caseList`);
        console.log(res);
      })
      .catch(err => {
        setShowLoading(false);
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
              {caseDetails.case_status != 'Case Closed' && (
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
                    { moment(new Date(caseDetails.exposure_date)).format( 'MM/DD/YYYY' )}
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
                      {caseDetails.building_name}
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
                    { moment(new Date(caseDetails.symptoms_began_date)).format( 'MM/DD/YYYY' )}
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
                      {caseDetails.building_name}
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
                      { moment(new Date(caseDetails.consult_date)).format( 'MM/DD/YYYY' )}
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
                    { moment(new Date(caseDetails.diagnosis_received_date)).format( 'MM/DD/YYYY' )}
                    </Typography>
                  </Grid>
                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      Date of Covid Test
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                    { moment(new Date(caseDetails.diagnosis_test_date)).format( 'MM/DD/YYYY' )}
                    </Typography>
                  </Grid>

                  <Grid className="detailsList">
                    <Typography variant="h6" gutterBottom>
                      What Cepheid buildings were you in over the last 2 weeks
                      since the time of the exposure, symptom onset or
                      diagnosis?
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {caseDetails.building_name}
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
                      {caseDetails.building_name}
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
          <Grid item lg={6} md={6} sm={12}>
            {caseDetails.case_status != 'Case Closed' &&
                  caseDetails.case_status != 'HRM Reviewed' && caseDetails.case_status != 'Final Action' &&  (
                <Typography variant="h5" color="secondary" gutterBottom>
                  Recommend Action
                </Typography>
              )}
            <Grid className="contentAction">
              <Grid container spacing={2}>
                {caseDetails.case_status != 'Case Closed' &&
                  caseDetails.case_status != 'HRM Reviewed' && caseDetails.case_status != 'Final Action' && (
                    <Grid item md={6} lg={6} sm={12} xs={12}>
                      <Formik
                        initialValues={{
                          chooseAction: '',
                          desp: '',
                        }}
                        onSubmit={values => {
                          console.log('values', values);
                        }}
                        // validationSchema={schema}
                        render={formikBag => (
                          <Form onSubmit={formikBag.handleSubmit}>
                            <Grid container spacing={2}>
                              <Grid item md={12}>
                                <FormControl
                                  variant="outlined"
                                  className="fullWidth"
                                >
                                  <InputLabel id="departments">
                                    Choose Action
                                  </InputLabel>
                                  <Select
                                    labelId="departments"
                                    id="departments"
                                    value={action}
                                    onChange={handleChangeDepartment}
                                    label="Departments"
                                    // autoWidth
                                    MenuProps={{
                                      getContentAnchorEl: null,
                                      anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                      },
                                    }}
                                  >
                                    {ActionList.map(list => (
                                      <MenuItem
                                        key={list.label}
                                        value={list.value}
                                      >
                                        {list.label}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                {/* <div className="form-control">
                                                        <TextField
                                                            //required
                                                            fullWidth
                                                            id="chooseAction"
                                                            label="Choose Action"
                                                            variant="outlined"
                                                            className="inputField"
                                                            size="small"
                                                        />
                                                    </div> */}
                              </Grid>
                              <Grid item md={12}>
                                <div className="form-control textareaWrap">
                                  <Typography variant="body2" gutterBottom>
                                    Other Precautions
                                  </Typography>
                                  <TextareaAutosize
                                    value={otherPrecautions}
                                    onChange={e =>
                                      setOtherPrecautions(e.target.value)
                                    }
                                    id="desp"
                                    rowsMin={3}
                                    aria-label="empty textarea"
                                    className="textarea"
                                  />
                                </div>
                              </Grid>
                              <Grid item xs={12} className="action_mob_fix">
                                <div className="">
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    className="btn medium continue_action"
                                    onClick={fnSendHrmReview}
                                  >
                                    Submit
                                  </Button>
                                </div>
                              </Grid>
                            </Grid>
                          </Form>
                        )}
                      />
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
                      <Grid item md={4}>
                        <Grid className="listCard">
                          <Link color="primary" onClick={handleClickOpenAM}>
                            Associates Details
                          </Link>
                        </Grid>
                      </Grid>
                      <Grid item md={4}>
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
          </Grid>
        </Grid>
      </Grid>

      {openAssociateModal && (
        <AssociatesDetailsModal
          handleClose={handleCloseAM}
          open={openAssociateModal}
          data={associates}
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

export default HRMDetail;
