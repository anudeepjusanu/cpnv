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
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MUIDataTable from 'mui-datatables';
import history from 'utils/history';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const AssociatesDetailsModal = props => {
  const classes = useStyles();

  const caseListHelperData = [];

  props.data.forEach(list => {
    caseListHelperData.push({
      ...list,
      child_case_id: list.child_case_id ? list.child_case_id : '--',
    });
  });


  const childCase = (e, value) => {
    let name = value[1].split(' ');
    if (!name) {
      name = [];
    }

    let associate = props.data.find(associate=> associate.full_name == value[1]);

    history.push({
      pathname: `/hrbp/childCase/${props.case_id}`,
      state: { firstName: name[0], lastName: name[1], status: props.status, parent_contact_id: value[6] },
    });
  };
  const columns = [
    {
      name: 'case_id',
      label: 'Parent Case ID',
    },
    {
      name: 'full_name',
      label: 'Full Name',
    },
    {
      name: 'has_social_distance',
      label: 'Was there social distancing',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            {value == 1 ? 'Yes' : 'No'}
          </React.Fragment>
        ),
      }
    },
    {
      name: 'ppe_worn',
      label: 'Was any PPE worn',
    },
    {
      name: 'child_case_id',
      label: 'Child case id',
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            <Button
              variant="contained"
              color="secondary"
              className="btn small"
              size="small"
              onClick={e => {
                childCase(e, tableMeta.rowData);
              }}
              disabled={tableMeta.rowData[4] !== '--'}
            >
              Create Case
            </Button>
          </React.Fragment>
        ),
      },
    },
    {
      name: 'contact_id',
      label: 'contact_id',
      options : {
        display: false
      }
    },
  ];

  const options = {
    filterType: 'checkbox',
    // responsive: 'stacked',
    hasIndex: true,
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 10,
    rowHover: true,
    selectableRows: false,
    fixedHeaderOptions: false,
    print: false,
    download: false,
    filter: false,
    search: false,
    pagination: false,
    viewColumns: false,
  };

  return (
    <React.Fragment>
      <Dialog
        maxWidth="md"
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle className="dialogTitle">
          <Typography variant="h4">Associates Details</Typography>
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
            <MUIDataTable
              data={caseListHelperData}
              columns={columns}
              options={options}
              className="dynamicTable"
            />
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AssociatesDetailsModal;
