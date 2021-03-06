import React, { Fragment, useState, useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  Hidden,
  TableBody,
  TableCell,
  TableContainer,
  OutlinedInput,
  InputAdornment,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FormContext from 'FormContext';

const StyledTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.action.hover,
    borderColor: 'white',
    borderStyle: 'solid',
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    // minWidth: 500,
    // overflowX: 'hidden'
  },
  formLayout: {
    marginBottom: '10px',
    overflowX: 'hidden',
  },
});

export default function AssociateContactForm(props) {
  const { basicInfo, updateFormData, associates } = useContext(FormContext);

  const classes = useStyles();
  const [contacts, setContact] = useState(associates);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [socialDistance, setSocialDistance] = useState('');
  const [PPEWorn, setPPEWorn] = useState('');
  const [durationContact, setDurationContact] = useState('');

  const addContact = () => {
    const contact = {
      first_name: firstName,
      last_name: lastName,
      has_social_distance: socialDistance,
      ppe_worn: PPEWorn,
      duration: durationContact,
    };
    let tempContacts = [...contacts];
    tempContacts.splice(0, 0, contact);
    setContact(tempContacts);
    props.contactArray(tempContacts);
    setFirstName('');
    setLastName('');
    setSocialDistance('');
    setPPEWorn('');
    setDurationContact('');
  };

  const socialDistanceList = ['yes', 'no'];
  const PPEList = ['Most of the times', 'Some times', 'Always'];
  const handleChangeSocialDistance = event => {
    setSocialDistance(event.target.value);
  };
  const handleChangePPE = event => {
    setPPEWorn(event.target.value);
  };
  return (
    <Fragment>
      <Grid container spacing={1} className={classes.formLayout}>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <FormControl variant="outlined" className="fullWidth selectField">
            <InputLabel id="departments" margin="dense">Was 6” Social Distance</InputLabel>
            <Select
              labelId="socialDistance"
              id="socialDistance"
              value={socialDistance}
              onChange={handleChangeSocialDistance}
              label="Was 6” Social Distance"
              margin="dense"
              // autoWidth
              MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
              }}
            >
              {socialDistanceList.map(list => (
                <MenuItem key={list} value={list}>
                  {list}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <FormControl variant="outlined" className="fullWidth selectField">
            <InputLabel id="departments" margin="dense">Select PPE Worn</InputLabel>
            <Select
              labelId="PPEWorn"
              id="PPEWorn"
              value={PPEWorn}
              onChange={handleChangePPE}
              label="Select PPE Worn"
              margin="dense"
              // autoWidth
              MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
              }}
            >
              {PPEList.map(list => (
                <MenuItem key={list} value={list}>
                  {list}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          {/* <TextField fullWidth size="small" id="outlined-basic" label="Duration of Contact" variant="outlined" value={durationContact} onChange={(e)=>setDurationContact(e.target.value)}/> */}
          <FormControl variant="outlined" className="fullWidth adornment">
            <InputLabel htmlFor="outlined-adornment-duration" margin="dense">
              Duration of Contact
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-duration"
              type="text"
              value={durationContact}
              onChange={e => setDurationContact(e.target.value)}
              endAdornment={<InputAdornment position="end">Hours</InputAdornment>}
              labelWidth={115}
              className="outlinedInputField"
              size="small"
              margin="dense"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} className="addContact">
          <Button
            onClick={addContact}
            variant="contained"
            color="primary"
            className="btn square"
          >
            <AddIcon />
          </Button>
          <span>Add Contact</span>
        </Grid>
      </Grid>

      {/* mobile card */}
      <Hidden smUp implementation="css">
        <Grid container spacing={1}>
          {contacts.map((row, index) => (
            <Grid item xs={12}>
              <Grid className="tableCard">
                <Typography variant="body2" gutterBottom>
                  First Name: {row.first_name ? row.first_name : '--'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Last Name: {row.last_name ? row.last_name : '--'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Social Distance:{' '}
                  {row.has_social_distance ? row.has_social_distance : '--'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  PPE Worn: {row.ppe_worn ? row.ppe_worn : '--'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Duration of Contact: {row.duration ? row.duration : '--'}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Hidden>
      {/* Desktop table */}
      <Hidden xsDown implementation="css">
        <TableContainer className="cpnvTable_content">
          <Table className={classes.table} aria-label="customized table">
            {/* <TableHead>
          <TableRow>
            { props.showHeader &&
              props.columns.map((header, index)=>(
                <Fragment>
                  {index==0 && <StyledTableCell>{header.name}</StyledTableCell>}
                  {index !== 0 && <StyledTableCell align="right">{header.name}</StyledTableCell>}
                </Fragment>
              ))
            }
          </TableRow>
        </TableHead> */}
            <TableBody>
              {contacts.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell className="width5">
                    {row.first_name}
                  </StyledTableCell>
                  <StyledTableCell className="width5">
                    {row.last_name}
                  </StyledTableCell>
                  <StyledTableCell className="width5">
                    {row.has_social_distance}
                  </StyledTableCell>
                  <StyledTableCell className="width5">
                    {row.ppe_worn}
                  </StyledTableCell>
                  <StyledTableCell className="width5">
                    {row.duration}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Hidden>
    </Fragment>
  );
}
