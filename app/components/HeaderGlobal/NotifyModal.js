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
  TextField,
  TextareaAutosize,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { NotifyCRT } from 'services/CrtService';
import { useAlert } from 'react-alert';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const NotifyModal = props => {
  const classes = useStyles();
  const alert = useAlert();
  const caseId = props.location.pathname.split('/hrm/case/')[1];
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emails, setEmails] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    if (emails.length && message != '') {
      let emailArr = [];
      for (var i = 0, len = emails.length; i < len; i++) {
        emailArr.push(emails[i].value);
      }
      NotifyCRT(caseId, { emails: emailArr, message: message }).then(
        res => {
          alert.show('CRT notified successfully', {
            type: 'success',
          });
          props.handleClose(e, false);
        },
        err => {
          alert.show('Error notifying CRT', {
            type: 'error',
          });
          console.log(err);
        },
      );
    } else {
      alert.show('Please enter a valid message and atleast one email', {
        type: 'error',
      });
    }
  };
  const users = [
    {
      title: 'Laurent Bellon',
      value: 'laurent.bellon@cepheid.com',
    },
    {
      title: 'Shibu Gangadharan',
      value: 'shibu.gangadharan@cepheid.com',
    },
    {
      title: 'Dave Persing',
      value: 'dave.persing@cepheid.com',
    },
    {
      title: 'Michael Loeffelholz',
      value: 'michael.loeffelholz@cepheid.com',
    },
    {
      title: 'Fred Tenover',
      value: 'fred.tenover@cepheid.com',
    },
    {
      title: 'Dave Benjamin',
      value: 'dave.benjamin@cepheid.com',
    },
    {
      title: 'Kimberly Kullen',
      value: 'kimberly.kullen@cepheid.com',
    },
    {
      title: 'Rob Uhlfelder',
      value: 'robert.uhlfelder@cepheid.com',
    },
  ];

  return (
    <React.Fragment>
      <Dialog
        maxWidth="md"
        onClose={e => {
          props.handleClose(e, false);
        }}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle className="dialogTitle">
          <Typography variant="h4">Notify</Typography>
          {props.handleClose ? (
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={e => {
                props.handleClose(e, false);
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid className="notifyForm">
              <div className="form-control mb-10">
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={users}
                  getOptionLabel={option => option.title}
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Multiple values"
                      placeholder="Emails"
                    />
                  )}
                  value={emails}
                  onChange={(event, value) => setEmails(value)}
                />
              </div>
              <div className="form-control mb-10 textareaWrap">
                <TextareaAutosize
                  rowsMin={3}
                  aria-label="Message"
                  className="textarea"
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  placeholder="Message"
                />
              </div>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className="btn medium continue_action"
              type="submit"
            >
              Notify
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default NotifyModal;
