import React, {Fragment, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import './tableStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
    minWidth: 500,
    overflowX: 'hidden'
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
        <Grid item xs={2}>
        <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>

        </Grid>
        <Grid item xs={2}>
        <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>

        </Grid>
        <Grid item xs={2}>
        <TextField id="outlined-basic" label="Company Name" variant="outlined" value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>

        </Grid>
        <Grid item xs={4}>
        <TextField fullWidth id="outlined-basic" label="Other Details" variant="outlined" value={otherDetails} onChange={(e)=>setOtherDetails(e.target.value)}/>

        </Grid>
        <Button onClick={addContact} size="small" variant="contained" color="primary" className={classes.button}>
            <FontAwesomeIcon icon={faPlus} size="2x"/>
        </Button>
        </Grid>
            
    <TableContainer className="cpnvTable" component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
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
        </TableHead>
        <TableBody>
          {contacts.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.lastName}</StyledTableCell>
              <StyledTableCell align="right">{row.companyName}</StyledTableCell>
              <StyledTableCell align="right">{row.otherDetails}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Fragment>
  );
}



// Example

// <CpnvTable
//     ></CpnvTable>