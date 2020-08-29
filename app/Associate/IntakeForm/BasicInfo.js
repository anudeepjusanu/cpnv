import React, { useState, useEffect, useContext } from 'react';
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
import { submitBasciInfo, updateBasciInfo } from './../../services/intakeFormService';
import FormContext from 'FormContext';

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
  const { updateFormData, basicInfo } = useContext(FormContext);
  const [department, setDepartment] = React.useState(basicInfo.department_id || '');
  const [isSwitchActionEn, setIsSwitchActionEn] = useState(basicInfo.is_working_remotely == 1 ? true : false);
  const [firstName, setFirstName] = useState(basicInfo.first_name || '');
  const [lastName, setLastName] = useState(basicInfo.last_name || '');
  const [phoneNumber, setPhoneNumber] = useState(basicInfo.mobile || '');
  const [email, setEmail] = useState(basicInfo.email || '');
  const [emergencyContact, setEmergencyContact] = useState(basicInfo.emergency_conatct || '');
  const [address, setAddress] = useState(basicInfo.address || '');
  const [buildingName, setBuildingName] = useState(basicInfo.building_name || '');
  const [area, setArea] = useState(basicInfo.area || '');
  const [hrbpName, setHrbpName] = useState(basicInfo.hrbp_name || '');
  const [managerName, setManagerName] = useState(basicInfo.manager_name || '');

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
        <Grid item lg={10} md={10} sm={10} xs={10} className="modalFormWidth">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
              emergencyContact: '',
              department: '',
              address: '',
              isSwitchActionEn: '',
              buildingName: '',
              area: '',
              hrbpName: '',
              managerName: '',
            }}
            onSubmit={values => {
              let basicInfoReq = {
                'first_name': firstName,
                "last_name": lastName,
                "mobile": phoneNumber,
                "email": email,
                "emergency_conatct": emergencyContact,
                "address": address,
                "department_id": department,
                "is_working_remotely": isSwitchActionEn ? 1 : 0,
                "building_name": buildingName,
                "area": area,
                "hrbp_name": hrbpName,
                "manager_name": managerName,
            }
            if(basicInfo.intakeId){
              updateBasciInfo(basicInfoReq, basicInfo.intakeId).then( async res=>{
                updateFormData('basicInfo', {...basicInfoReq, intakeId : basicInfo.intakeId});
                props.handleNext('basicInfo');
              }).catch(err=>{console.log("ERR", err)});
            } else {
              submitBasciInfo(basicInfoReq).then( async res=>{
                updateFormData('basicInfo', {...basicInfoReq, intakeId : res.data.case.case_id});
                props.handleNext('basicInfo');
              }).catch(err=>{console.log("ERR", err)});
            }
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
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            className="inputField"
                            size="small"
                            onChange={(e)=>setFirstName(e.target.value)}
                            value={firstName}
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
                            onChange={(e)=>setLastName(e.target.value)}
                            value={lastName}
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
                              onChange={(e)=>setPhoneNumber(e.target.value)}
                              value={phoneNumber}
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
                              onChange={(e)=>setEmail(e.target.value)}
                              value={email}
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
                              onChange={(e)=>setEmergencyContact(e.target.value)}
                              value={emergencyContact}
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
                            <TextareaAutosize  rowsMin={3} aria-label="empty textarea" className="textarea" onChange={(e)=>setAddress(e.target.value)}
                              value={address}/>
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
                              onChange={(e)=>setBuildingName(e.target.value)}
                              value={buildingName}
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
                              onChange={(e)=>setArea(e.target.value)}
                              value={area}
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
                              onChange={(e)=>setHrbpName(e.target.value)}
                              value={hrbpName}
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
                              onChange={(e)=>setManagerName(e.target.value)}
                              value={managerName}
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
