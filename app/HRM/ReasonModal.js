import React, { useState, useEffect, useContext } from 'react';
import { Grid, Button, makeStyles, Dialog, Typography, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IntakeReason from './IntakeReason/IntakeReason';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const ReasonModal = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Dialog maxWidth='md' onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
                <DialogTitle className="dialogTitle">
                    <Typography variant="h4">Reason</Typography>
                    {props.handleClose ? (
                        <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent>
                    <Grid className="dynamicTableWrap">
                        <IntakeReason
                        caseDetails={props.caseDetails}
                        handleClose={props.handleClose}/>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default ReasonModal;