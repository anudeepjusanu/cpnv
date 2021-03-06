import React, {Fragment, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, Hidden, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid, Typography }  from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './tableStyles.css';

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

export default function CpnvTable(props) {
  const classes = useStyles();
  const [contacts, setContact] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const addContact= ()=> {
    const contact = {firstName : firstName, lastName: lastName, companyName: companyName, otherDetails: otherDetails };
    let tempContacts = [...contacts]
    tempContacts.splice(0,0,contact);
    console.log(tempContacts)
    setContact(tempContacts);
    setFirstName("");
    setLastName('');
    setCompanyName('');
    setOtherDetails('');
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
        <TextField fullWidth size="small" id="outlined-basic" label="Company Name" variant="outlined" value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>

        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
        <TextField fullWidth size="small" fullWidth id="outlined-basic" label="Other Details" variant="outlined" value={otherDetails} onChange={(e)=>setOtherDetails(e.target.value)}/>

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
              <Typography variant="body2" gutterBottom>Company Name: {row.companyName ? row.companyName : '--'}</Typography>
              <Typography variant="body2" gutterBottom>Other Details: {row.otherDetails ? row.otherDetails : '--'}</Typography>
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
              <StyledTableCell className="width1">{row.firstName}</StyledTableCell>
              <StyledTableCell className="width2">{row.lastName}</StyledTableCell>
              <StyledTableCell className="width3">{row.companyName}</StyledTableCell>
              <StyledTableCell className="width4">{row.otherDetails}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Hidden>
    </Fragment>
  );
}



// Example

// <CpnvTable
//     ></CpnvTable>