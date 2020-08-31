import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  Dialog,
  Typography,
  DialogContent,
  DialogTitle,
  IconButton,
  Select,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Switch,
  withStyles,
  TextareaAutosize,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getDepartments, updateBasciInfo } from 'services/intakeFormService';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

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

const EmployeDetailsModal = props => {
  const classes = useStyles();
  const { caseDetails } = props;
  console.log(caseDetails);
  const [department, setDepartment] = React.useState(
    caseDetails.department_id || '',
  );
  const [isSwitchActionEn, setIsSwitchActionEn] = useState(
    caseDetails.is_working_remotely == 1 ? true : false,
  );
  const [firstName, setFirstName] = useState(caseDetails.first_name || '');
  const [lastName, setLastName] = useState(caseDetails.last_name || '');
  const [phoneNumber, setPhoneNumber] = useState(caseDetails.mobile || '');
  const [email, setEmail] = useState(caseDetails.email || '');
  const [emergencyContact, setEmergencyContact] = useState(
    caseDetails.emergency_conatct || '',
  );
  const [address, setAddress] = useState(caseDetails.address || '');
  const [buildingName, setBuildingName] = useState(
    caseDetails.building_name || '',
  );
  const [area, setArea] = useState(caseDetails.area || '');
  const [hrbpName, setHrbpName] = useState(caseDetails.hrbp_name || '');
  const [managerName, setManagerName] = useState(
    caseDetails.manager_name || '',
  );
  const [showLoading, setShowLoading] = useState(false);

  const handleSwitchChange = () => {
    if (isSwitchActionEn) {
      return setIsSwitchActionEn(false);
    }
    return setIsSwitchActionEn(true);
  };

  const handleChangeDepartment = event => {
    setDepartment(event.target.value);
  };

  const [departmentsList, setDepartmentList] = useState([]);

  const handleSubmit = () => {
    let basicInfoReq = {
      first_name: firstName,
      last_name: lastName,
      mobile: phoneNumber,
      email: email,
      emergency_conatct: emergencyContact,
      address: address,
      department_id: department,
      is_working_remotely: isSwitchActionEn ? 1 : 0,
      building_name: buildingName,
      area: area,
      hrbp_name: hrbpName,
      manager_name: managerName,
    };
    setShowLoading(true);
    updateBasciInfo(basicInfoReq, caseDetails.case_id)
      .then(async res => {
        if (res && res.data) {
          setShowLoading(false);
          props.handleClose('success');
        }
      })
      .catch(err => {
        setShowLoading(false);
        console.log('ERR', err);
      });
  };

  useEffect(() => {
    setShowLoading(true);
    getDepartments().then(
      res => {
        if (res && res.data) {
          setDepartmentList(res.data.departments);
          setShowLoading(false);
        }
      },
      err => {
        console.log(err);
        setShowLoading(false);
      },
    );
  }, []);

  return (
    <React.Fragment>
      {showLoading && (
          <Grid className="loader">
              <Loader type="ThreeDots" color="#127AC2" height={80} width={80} />
          </Grid>
      )}
      <Dialog
        maxWidth="md"
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle className="dialogTitle">
          <Typography variant="h4">Employee Details</Typography>
          {props.handleClose ? (
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={props.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent>
          <Grid className="dynamicTableWrap">
            <React.Fragment>
              <Grid container className="stepperSpace">
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className="modalFormWidth"
                >
                  <form>
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
                                onChange={e => setFirstName(e.target.value)}
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
                                onChange={e => setLastName(e.target.value)}
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
                                  onChange={e => setPhoneNumber(e.target.value)}
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
                                  onChange={e => setEmail(e.target.value)}
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
                                  onChange={e =>
                                    setEmergencyContact(e.target.value)
                                  }
                                  value={emergencyContact}
                                />
                              </div>
                            </Grid>
                            <Grid item md={3} lg={3} sm={6} xs={12}>
                              <FormControl
                                variant="outlined"
                                className="fullWidth"
                              >
                                <InputLabel id="departments">
                                  Department
                                </InputLabel>
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
                                    <MenuItem
                                      key={list.deparment_id}
                                      value={list.deparment_id}
                                    >
                                      {list.deparment_name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item md={6} lg={6} sm={6} xs={12}>
                              <div className="form-control textareaWrap">
                                <Typography variant="body2" gutterBottom>
                                  Address
                                </Typography>
                                <TextareaAutosize
                                  rowsMin={3}
                                  aria-label="empty textarea"
                                  className="textarea"
                                  onChange={e => setAddress(e.target.value)}
                                  value={address}
                                />
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
                              <Typography
                                component="div"
                                className="switchWrap"
                              >
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
                                  onChange={e =>
                                    setBuildingName(e.target.value)
                                  }
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
                                  onChange={e => setArea(e.target.value)}
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
                                  onChange={e => setHrbpName(e.target.value)}
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
                                  onChange={e => setManagerName(e.target.value)}
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
                          onClick={e => {
                            props.handleClose('close');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          className="btn medium ml-15 continue_action"
                          onClick={handleSubmit}
                        >
                          Update
                        </Button>
                      </div>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </React.Fragment>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default EmployeDetailsModal;
