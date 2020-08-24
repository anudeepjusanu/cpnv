import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Typography,
  Select,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Switch,
  withStyles,
  TextareaAutosize
} from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';

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

const BasicInfo = props => {
  const [department, setDepartment] = React.useState('');
  const [isSwitchActionEn, setIsSwitchActionEn] = useState(false);

  const handleSwitchChange = () => {
    if (isSwitchActionEn) {
      return setIsSwitchActionEn(false);
    }
    return setIsSwitchActionEn(true);
  };

  const handleChangeDepartment = event => {
    setDepartment(event.target.value);
  };

  const departmentsList = [
    {
      label: 'Test',
      value: 'test',
    },
    {
      label: 'Test 2',
      value: 'test2',
    },
  ];

  return (
    <React.Fragment>
      <Grid container className="stepperSpace">
        <Grid item lg={10} md={10} sm={10} xs={10}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
              emergencyContact: '',
              departments: '',
              address: '',
              remotely: '',
              buildingName: '',
              area: '',
              hrbp: '',
              manager: '',
            }}
            onSubmit={values => {
              console.log('onsubmit basic form', values);
              props.handleNext('basicInfo');
            }}
            // validationSchema={schema}
            render={formikBag => (
              <Form onSubmit={formikBag.handleSubmit}>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <Grid container spacing={2} className="formBtmSpace">
                      <Grid item md={3} lg={3} sm={6} xs={12}>
                        <div className="form-control">
                          <TextField
                            //required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            className="inputField"
                            size="small"
                          />
                        </div>
                      </Grid>
                      <Grid item md={3} lg={3} sm={6} xs={12}>
                        <div className="form-control">
                          <TextField
                            //required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            variant="outlined"
                            className="inputField"
                            size="small"
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Grid className="contactInfoSpacBtm">
                      <Typography variant="overline" gutterBottom>
                        Contact Information
                      </Typography>
                      <Grid container spacing={2} className="formBtmSpace">
                        <Grid item md={3} lg={3} sm={6} xs={12}>
                          <div className="form-control">
                            <TextField
                              //required
                              fullWidth
                              id="phoneNumber"
                              label="Phone Number"
                              variant="outlined"
                              className="inputField"
                              size="small"
                            />
                          </div>
                        </Grid>
                        <Grid item md={3} lg={3} sm={6} xs={12}>
                          <div className="form-control">
                            <TextField
                              //required
                              fullWidth
                              id="email"
                              label="Email"
                              variant="outlined"
                              className="inputField"
                              size="small"
                            />
                          </div>
                        </Grid>
                        <Grid item md={3} lg={3} sm={6} xs={12}>
                          <div className="form-control">
                            <TextField
                              //required
                              fullWidth
                              id="emergencyContact"
                              label="Emergency Contact"
                              variant="outlined"
                              className="inputField"
                              size="small"
                            />
                          </div>
                        </Grid>
                        <Grid item md={3} lg={3} sm={6} xs={12}>
                          <FormControl variant="outlined" className="fullWidth">
                            <InputLabel id="departments">Age</InputLabel>
                            <Select
                              labelId="departments"
                              id="departments"
                              value={department}
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
                              {departmentsList.map(list => (
                                <MenuItem key={list.label} value={list.value}>
                                  {list.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} lg={6} sm={6} xs={12}>
                          <div className="form-control textareaWrap">
                            <Typography variant="body2" gutterBottom>Address</Typography>
                            <TextareaAutosize  rowsMin={3} aria-label="empty textarea" className="textarea" />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Grid className="contactInfoSpacBtm">
                      <Grid className="remotelyBlk">
                        <Typography
                          variant="body2"
                          gutterBottom
                          className="remotelySwitch"
                        >
                          Are you working remotely ?
                          <Typography component="div" className="switchWrap">
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
                                    'aria-label': 'secondary checkbox',
                                  }}
                                />
                              </Grid>
                              <Grid item className="switchLabel">
                                Yes
                              </Grid>
                            </Grid>
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item md={3} lg={3} sm={6} xs={12}>
                          <div className="form-control">
                            <TextField
                              //required
                              fullWidth
                              id="buildingName"
                              label="Building Name"
                              variant="outlined"
                              className="inputField"
                              size="small"
                            />
                          </div>
                        </Grid>
                        <Grid item md={3} lg={3} sm={6} xs={12}>
                          <div className="form-control">
                            <TextField
                              //required
                              fullWidth
                              id="area"
                              label="Area"
                              variant="outlined"
                              className="inputField"
                              size="small"
                            />
                          </div>
                        </Grid>
                        <Grid item md={3} lg={3} sm={6} xs={12}>
                          <div className="form-control">
                            <TextField
                              //required
                              fullWidth
                              id="hrpb"
                              label="HRBP (Full Name)"
                              variant="outlined"
                              className="inputField"
                              size="small"
                            />
                          </div>
                        </Grid>
                        <Grid item md={3} lg={3} sm={6} xs={12}>
                          <div className="form-control">
                            <TextField
                              //required
                              fullWidth
                              id="manager"
                              label="Manager (Full Name)"
                              variant="outlined"
                              className="inputField"
                              size="small"
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className="action_mob_fix">
                  <div className="text-left-btn">
                    <Button
                      type="reset"
                      variant="outlined"
                      color="primary"
                      className="btn medium cancel_action"
                      size="large"
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
              </Form>
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default BasicInfo;
