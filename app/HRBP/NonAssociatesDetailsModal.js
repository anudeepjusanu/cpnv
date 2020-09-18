import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, makeStyles, Dialog, Typography, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const NonAssociatesDetailsModal = (props) => {
    const classes = useStyles();
    console.log(props)

    const columns = [
        {
            name: 'case_id',
            label: 'Parent Case ID',
        },
        {
            name: 'first_name',
            label: 'First Name',
        },
        {
            name: 'last_name',
            label: 'Last Name',
        },
        {
            name: 'company_name',
            label: 'companyName',
        },
        {
            name: 'details',
            label: 'Other Details',
        }
    ];

    const data = [
        {
            'parentCaseID': '#232',
            'fullName': 'Kristin Mccoy',
            'lastName': 'Yes',
            'companyName': 'Oxford Medical',
            'otherDetails': '--'
        }
    ];

    const options = {
        filterType: 'checkbox',
        // responsive: 'stacked',
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

    return (
        <React.Fragment>
            <Dialog maxWidth='lg' onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
                <Grid className="dialogWrap">
                    <DialogTitle className="dialogTitle">
                        <Typography variant="h4">Non-Associates Details</Typography>
                        {props.handleClose ? (
                            <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        ) : null}
                    </DialogTitle>
                    <DialogContent>
                        <Grid className="dynamicTableWrap">
                            <MUIDataTable
                                data={props.data}
                                columns={columns}
                                options={options}
                                className="dynamicTable"
                            />
                        </Grid>
                    </DialogContent>
                </Grid>
            </Dialog>
        </React.Fragment>
    )
}

export default NonAssociatesDetailsModal;