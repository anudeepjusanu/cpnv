import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const ExposedUndiagnosed = (props) => {
    const [exposureDate, setExposureDate] = useState(null);
    
    const handleDateChange = (date) => {
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
                        desp3: ''
                    }}
                    onSubmit={(values) => {
                        console.log('onsubmit exposed form', values)
                    }}
                    // validationSchema={schema}
                    render={(formikBag) => (
                        <Form onSubmit={formikBag.handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item md={3} className="datePicker">
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
                                                        "aria-label": "change date"
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={5}>
                                    <div className="form-control">
                                        <TextField
                                            id="desp1"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Please describe the circumstances of exposure"
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={5}>
                                    <div className="form-control">
                                        <TextField
                                            id="desp2"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            placeholder="What Cepheid buildings were you in over the last 2 weeks since the time of the exposure, symptom onset or diagnosis? (Including Building #, conference rooms and common areas)"
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={5}>
                                    <div className="form-control">
                                        <TextField
                                            id="desp3"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Additional information if needed"
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                <div className="text-left-btn tabFormActionTopSpace">
                                    <Button
                                        type="reset"
                                        variant="outlined"
                                        color="primary"
                                        className="btn medium ml-15"
                                        size="large"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        className="btn medium ml-15"
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
    )
}

export default ExposedUndiagnosed;