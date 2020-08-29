import React, { useState, useEffect, useContext } from 'react';
import { Grid, Select, Button, Link, TextField, Typography, TextareaAutosize, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import MUIDataTable from "mui-datatables";
import AssociatesDetailsModal from './AssociatesDetailsModal';
import NonAssociatesDetailsModal from './NonAssociatesDetailsModal';
import ReasonModal from './ReasonModal';
import { GetCaseDetails, sendHrmReview } from './../services/HrmService';

const HRMDetail = (props) => {
    const [openAssociateModal, setOpenAssociateModal] = useState(false);
    const [openNonAssociateModal, setOpenNonAssociateModal] = useState(false);
    const [openReasonModal, setOpenReasonModal] = useState(false);
    const [caseDetails, setCaseDetails] = useState({});
    const [action, setAction] = useState('');
    const [otherPrecautions, setOtherPrecautions] = useState('');

    useEffect(()=>{
        getCaseDetails();
    },[]);

    const getCaseDetails = () => {
        const case_id = props.match.params.case_id;
        GetCaseDetails(case_id).then(res=> {

            setCaseDetails(res.data.case);
        }).catch(err => console.log(err));
    }

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
    }

    const handleCloseReason = () => {
        setOpenReasonModal(false);
    }
    
    // const employeDetails = {
    //     name: 'Ricky Ponting',
    //     email: 'rickyp@cepheid.com',
    //     contact: '020 3993 2292',
    //     department: 'IT / Ops Team',
    //     emergencyContact: '020 8828 2228',
    //     address: '1250 borregas Av, Sunnyvale, CA, 94069 US',
    //     buildingName: 'Cepheid Building-4',
    //     area: 'Sunnyvale, CA'
    // }

    // const reasonDetails = {
    //     reasonForIntake: 'Exposed / Undiagnosed',
    //     dateExplore: '20/08/2020 10:20 AM',
    //     exposure: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //     additionalInfo: 'Nam gravida eros et purus porta, vel dignissim magna bibendum.',
    //     building: 'First Floor, Cepheid Build-4'
    // }

    const columns = [
        {
            name: 'addedBy',
            label: 'Added By',
        },
        {
            name: 'createdOn',
            label: 'Created On',
        },
        {
            name: 'recommendActions',
            label: 'Recommend Actions',
        },
        {
            name: 'otherPrecautions',
            label: 'Other Precautions',
        }
    ];

    const data = [
        {
            'addedBy': 'Matthew Wade (CRT)',
            'createdOn': '10/08/2020 13:40',
            'recommendActions': 'Quarantine + Testing',
            'otherPrecautions': 'Lorem ipsum dolor sit amet..',
        },
        {
            'addedBy': 'Matthew Wade (CRT)',
            'createdOn': '10/08/2020 13:40',
            'recommendActions': 'Quarantine + Testing',
            'otherPrecautions': 'Lorem ipsum dolor sit amet..',
        }
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
        viewColumns: false
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
        const req = { 
            "reviewer_user_email": "jennifer.marasco@cepheid.com",
            "recommend_actions": action,
            "other_preactions": otherPrecautions 
        }
        const case_id = props.match.params.case_id;
        sendHrmReview(req, case_id).then(res=>{
            console.log(res);
        }).catch(err=>console.log(err));
    }

    return (
        <React.Fragment>
            <Grid className="wrapper">
                <Grid container spacing={3}>
                    <Grid item lg={3} md={3} sm={12}>
                        <Typography variant="h5" color="secondary" gutterBottom>Employee Details</Typography>
                        <Grid className="employeDetail">
                            <Link className="linkAction" href="#" color="secondary">EDit</Link>
                            <Typography variant="h6" className="content_title">Employee Info</Typography>
                            <Grid className="detailsList">
                                <Typography variant="body1" gutterBottom>{caseDetails.first_name + ' ' + caseDetails.last_name}</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.email}</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.mobile}</Typography>
                            </Grid>
                            <Grid className="detailsList">
                                <Typography variant="h6" gutterBottom>Department:</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.department_id}</Typography>
                            </Grid>
                            <Grid className="detailsList">
                                <Typography variant="h6" gutterBottom>Emergency Contact:</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.emergency_conatct}</Typography>
                            </Grid>
                            <Grid className="detailsList">
                                <Typography variant="h6" gutterBottom>Address:</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.address}</Typography>
                            </Grid>
                            <Typography variant="h6" className="content_title">Working at Office:</Typography>
                            <Grid className="detailsList">
                                <Typography variant="h6" gutterBottom>Building Name:</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.building_name}</Typography>
                            </Grid>
                            <Grid className="detailsList">
                                <Typography variant="h6" gutterBottom>Area:</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.area}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <Typography variant="h5" color="secondary" gutterBottom>Reason</Typography>
                        <Grid className="reason">
                        <Link className="linkAction" href="#" color="secondary" onClick={handleClickOpenReason}>Edit</Link>
                            <Grid className="detailsList">
                                <Typography variant="h6" gutterBottom>Reason for Intake</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.reason}</Typography>
                            </Grid>
                            <Grid className="detailsList">
                                <Typography variant="h6" gutterBottom>Date of Exposure</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.exposure_date}</Typography>
                            </Grid>
                            <Grid className="detailsList">
                                <Typography variant="h6" gutterBottom>Please describe the circumstances of exposure.</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.exposure_describe}</Typography>
                            </Grid>
                            <Grid className="detailsList">
                                <Typography variant="h6" gutterBottom>Additional information if needed</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.additional_info}</Typography>
                            </Grid>
                            <Grid className="detailsList">
                                <Typography variant="h6" gutterBottom>What Cepheid buildings were you in over the last 2 weeks since the time of the exposure, symptom onset or diagnosis?</Typography>
                                <Typography variant="body1" gutterBottom>{caseDetails.building_name}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <Typography variant="h5" color="secondary" gutterBottom>Recommend Action</Typography>
                        <Grid className="contentAction">
                            <Grid container spacing={2}>
                                <Grid item md={6} lg={6} sm={12} xs={12}>
                                    <Formik
                                        initialValues={{
                                            chooseAction: '',
                                            desp: '',
                                        }}
                                        onSubmit={values => {
                                            console.log('values', values)
                                        }}
                                        // validationSchema={schema}
                                        render={formikBag => (
                                        <Form onSubmit={formikBag.handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item md={12}>
                                                <FormControl variant="outlined" className="fullWidth">
                                                    <InputLabel id="departments">Choose Action</InputLabel>
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
                                                        <MenuItem key={list.label} value={list.value}>
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
                                                        <Typography variant="body2" gutterBottom>Other Precautions</Typography>
                                                        <TextareaAutosize value={otherPrecautions} onChange={(e)=>setOtherPrecautions(e.target.value)} id="desp" rowsMin={3} aria-label="empty textarea" className="textarea"/>
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
                                <Grid item md={12}>
                                    <Grid className="tableListDetails">
                                        <Typography variant="h5" color="secondary" gutterBottom>Recommend Action</Typography>
                                        <Grid className="dynamicTableWrap">
                                            <MUIDataTable
                                                data={data}
                                                columns={columns}
                                                options={options}
                                                className="dynamicTable"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={12}>
                                    <Grid className="tableListDetails">
                                        <Typography variant="h5" color="secondary" gutterBottom>Child Cases</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item md={4}>
                                                <Grid className="listCard">
                                                    <Link color="primary" onClick={handleClickOpenAM}>Associates Details</Link>
                                                </Grid>
                                            </Grid>
                                            <Grid item md={4}>
                                                <Grid className="listCard">
                                                    <Link href="#" color="primary" onClick={handleClickOpenNAM}>Non-Associates Details</Link>
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

            {openAssociateModal && 
                <AssociatesDetailsModal handleClose={handleCloseAM} open={openAssociateModal} />
            }
            {openNonAssociateModal && 
                <NonAssociatesDetailsModal handleClose={handleCloseNAM} open={openNonAssociateModal} />
            }
            {openReasonModal && 
                <ReasonModal handleClose={handleCloseReason} open={openReasonModal} />
            }
        </React.Fragment>
    )
};

export default HRMDetail;