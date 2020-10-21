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
import { NotifyCRT, GetCRTS } from 'services/CrtService';
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetCRTS().then(res => {
      let arr = [];
      if (res.data && res.data.users) {
        for (var i = 0, len = res.data.users.length; i < len; i++) {
          arr.push({
            title: res.data.users[i].first_name,
            value: res.data.users[i].email,
          });
        }
      }
      setUsers(arr);
    });
  }, []);

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
