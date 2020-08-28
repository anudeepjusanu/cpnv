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

const AssociatesDetailsModal = (props) => {
    const classes = useStyles();

    const columns = [
        {
            name: 'parentCaseID',
            label: 'Parent Case ID',
        },
        {
            name: 'fullName',
            label: 'Full Name',
        },
        {
            name: 'socialDistancing',
            label: 'Was there social distancing',
        },
        {
            name: 'ppe',
            label: 'Was any PPE worn',
        },
        {
            name: 'action',
            label: 'Action',
            options: {
                customBodyRender: (value, tableMeta) => (
                    <React.Fragment>
                        <Button
                            variant="contained"
                            color="secondary"
                            className="btn small"
                            size="small"
                        >
                            Notify
                        </Button>
                    </React.Fragment>
                ),
            },
        },
    ];

    const data = [
        {
            'parentCaseID': '#232',
            'fullName': 'Kristin Mccoy',
            'socialDistancing': 'Yes',
            'ppe': 'Surgical Mask'
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
            <Dialog maxWidth='md' onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
                <DialogTitle className="dialogTitle">
                    <Typography variant="h4">Associates Details</Typography>
                    {props.handleClose ? (
                        <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent>
                    <Grid className="dynamicTableWrap">
                        <MUIDataTable
                            data={data}
                            columns={columns}
                            options={options}
                            className="dynamicTable"
                        />
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default AssociatesDetailsModal;