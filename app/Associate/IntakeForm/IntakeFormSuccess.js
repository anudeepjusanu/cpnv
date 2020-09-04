import React, {Fragment, useState, useContext} from 'react';
import { Typography, Button, Grid }  from '@material-ui/core';

const IntakeFormSuccess = props => {
    console.log('success props');
    return (
        <React.Fragment>
            <Grid className="successWrapper">
                <Typography variant="h3" gutterBottom>Thank you.</Typography>
                <Typography variant="body2" gutterBottom>
                    You have submitted the form successfully. Our team will contact you shortly to let you know about the status of your application.
                </Typography>
                <Button variant="outlined" color="secondary">Go Home</Button>
            </Grid>
        </React.Fragment>
    );
}

export default IntakeFormSuccess;
