import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, Link, TextField, Typography, TextareaAutosize, Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import MUIDataTable from "mui-datatables";
import { GetCaseDetails, sendCaseForReview } from './../services/CrtService';

const CRTDetail = (props) => {
    const [caseDetails, setCaseDetails] = useState({});
    const [openReasonModal, setOpenReasonModal] = useState(false);
    const [action, setAction] = useState('');
    const [otherPrecautions, setOtherPrecautions] = useState('');

    useEffect(()=>{
        getCaseDetails();
    },[]);

    const handleChangeDepartment = event => {
        setAction(event.target.value);
    };

    const handleClickOpenReason = () => {
        setOpenReasonModal(true);
    }

    const handleCloseReason = () => {
        setOpenReasonModal(false);
    }

    const getCaseDetails = () => {
        const case_id = props.match.params.case_id;
        GetCaseDetails(case_id).then(res=> {
            setCaseDetails(res.data.case);
        }).catch(err => console.log(err));
    }

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

    const crtReview = () => {
        const req = {
            "reviewer_user_email": "laurent.bellon@cepheid.com",
            "recommend_actions": action,
            "other_preactions": otherPrecautions 
        }
        const case_id = props.match.params.case_id;
        sendCaseForReview(req, case_id).then((res)=>{
            console.log(res);
        }).catch(err=>console.log(err));
    }

    return (
        <React.Fragment>
            <Grid className="wrapper">
                <Grid container spacing={3}>
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
                    <Grid item lg={7} md={7} sm={12}>
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
                                                            onClick={crtReview}
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
                                            <Grid item md={5}>
                                                <Grid className="listCard linear">
                                                    <Link color="primary">No. Of Associates Details <span>[ 03 ]</span></Link>
                                                </Grid>
                                            </Grid>
                                            <Grid item md={5}>
                                                <Grid className="listCard linear">
                                                    <Link href="#" color="primary">No. Of Non-Associates Details <span>[ 02 ]</span></Link>
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
        </React.Fragment>
    )
};

export default CRTDetail;