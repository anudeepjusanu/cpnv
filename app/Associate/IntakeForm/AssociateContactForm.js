import React, {Fragment, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, Hidden, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem }  from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
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
      overflowX: 'hidden'
  },
});

export default function AssociateContactForm(props) {
  const classes = useStyles();
  const [contacts, setContact] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [socialDistance, setSocialDistance] = useState("");
  const [PPEWorn, setPPEWorn] = useState("");
  const [durationContact, setDurationContact] = useState("");

  const addContact= ()=> {
    const contact = {firstName : firstName, lastName: lastName, socialDistance: socialDistance, PPEWorn: PPEWorn, durationContact: durationContact };
    let tempContacts = [...contacts]
    tempContacts.splice(0,0,contact);
    console.log(tempContacts)
    setContact(tempContacts);
    setFirstName("");
    setLastName('');
    setSocialDistance('');
    setPPEWorn('');
    setDurationContact('');
  }

  const socialDistanceList = [6, 12, 24]
  const handleChangeSocialDistance = event => {
    setSocialDistance(event.target.value);
  };
  const handleChangePPE = event => {
    setPPEWorn(event.target.value);
  }
  return (
    <Fragment>
      
        <Grid container spacing={1} className={classes.formLayout}>
        <Grid item xs={12} sm={6} md={3} lg={2}>
        <TextField fullWidth size="small" id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>

        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
        <TextField fullWidth size="small" id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
        <FormControl variant="outlined" className="fullWidth">
          <InputLabel id="departments">Was 6” Social Distance</InputLabel>
          <Select
            labelId="socialDistance"
            id="socialDistance"
            value={socialDistance}
            onChange={handleChangeSocialDistance}
            label="Was 6” Social Distance"
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
        <FormControl variant="outlined" className="fullWidth">
          <InputLabel id="departments">Select PPE Worn</InputLabel>
          <Select
            labelId="PPEWorn"
            id="PPEWorn"
            value={PPEWorn}
            onChange={handleChangePPE}
            label="Select PPE Worn"
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
        <TextField fullWidth size="small" id="outlined-basic" label="Duration of Contact" variant="outlined" value={durationContact} onChange={(e)=>setDurationContact(e.target.value)}/>
        
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} className="addContact">
        <Button onClick={addContact} variant="contained" color="primary" className="btn square">
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
              <Typography variant="body2" gutterBottom>First Name: {row.firstName ? row.firstName : '--'}</Typography>
              <Typography variant="body2" gutterBottom>Last Name: {row.lastName ? row.lastName : '--'}</Typography>
              <Typography variant="body2" gutterBottom>Social Distance: {row.socialDistance ? row.socialDistance : '--'}</Typography>
              <Typography variant="body2" gutterBottom>PPE Worn: {row.PPEWorn ? row.PPEWorn : '--'}</Typography>
              <Typography variant="body2" gutterBottom>Duration of Contact: {row.durationContact ? row.durationContact : '--'}</Typography>
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
              <StyledTableCell className="width5">{row.firstName}</StyledTableCell>
              <StyledTableCell className="width5">{row.lastName}</StyledTableCell>
              <StyledTableCell className="width5">{row.socialDistance}</StyledTableCell>
              <StyledTableCell className="width5">{row.PPEWorn}</StyledTableCell>
              <StyledTableCell className="width5">{row.durationContact}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Hidden>
    </Fragment>
  );
}
