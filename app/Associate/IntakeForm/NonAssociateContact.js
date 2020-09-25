import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Button,
  Typography,
  Switch,
  withStyles,
  IconButton
} from '@material-ui/core';
import NAContact from './NAContact';
import history from 'utils/history';
import FormContext from 'FormContext';
import { useAlert } from 'react-alert';
import { updateFormNonAssociate } from './../../services/intakeFormService';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const NonAssociateContact = props => {
  const alert = useAlert()
  const { basicInfo, updateFormData, nonAssociates } = useContext(FormContext);
  const [isOpen, setOpen] = useState(false);
  const [contacts, setContacts] = useState(nonAssociates);
  
  const addContacts = (contact) => {
    setContacts(contact);
  }

  const submitNoAssociateContact = () => {
    const req = contacts;
    if (contacts && !contacts.length) {
      setOpen(true);
      return;
    }
    updateFormNonAssociate(req, basicInfo.intakeId).then(res => {
      updateFormData('nonAssociates', req);
      props.handleNext();
      if (props.location.pathname.indexOf('/hrbp/childCase') >= 0) {
        alert.show('Child Case created Successfully', {
          type: 'success',
        });
        history.push({
          pathname: `/hrbp/case/${props.location.pathname.split(
            '/hrbp/childCase/',
          )[1]}`,
          state: { status: props.location && props.location.state ? props.location.state.status : '' },
        });
      } else {
        history.push(`/intakeForm/success`);
      }
    }).catch(err => {
      console.log('errrrrr', err);
      alert.show('something went wrong!!', {
        type: 'error',
      });
    });
    props.handleNext('associateContact');
  }

  const onConfirm = () => {
    const req = contacts
    updateFormNonAssociate(req, basicInfo.intakeId).then(res => {
      updateFormData('nonAssociates', req);
      props.handleNext();
      history.push(`/intakeForm/success`);
    }).catch(err => {
      console.log('errrrrr', err);
      alert.show('something went wrong!!', {
        type: 'error',
      });
    });
    props.handleNext('associateContact');
  }

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => props.handleBack(4)}
        className={`headerBackArrow`}
      >
        <ArrowBackIcon />
      </IconButton>
      <Grid container className="stepperSpace">
        <Grid item md={11}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1" class="m-b-20" gutterBottom>
                Who, if anyone, have you been in contact with at Cepheid over the last 2 weeks since the time of the exposure, symptom onset or diagnosis?
              </Typography>
              <NAContact contactArray={addContacts} />
            </Grid>
            <Grid item xs={12} className="action_mob_fix">
              <div className="text-left-btn tabFormActionTopSpace">
                <Button
                  type="reset"
                  variant="outlined"
                  color="primary"
                  className="btn medium cancel_action"
                  size="large"
                  onClick={() => props.handleBack(4)}
                >
                  Go Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  className="btn medium ml-15 continue_action"
                  onClick={submitNoAssociateContact}
                >
                  Submit
                </Button>
                <Dialog
                  open={isOpen}
                  onClose={() => setOpen(false)}
                  aria-labelledby="confirm-dialog"
                >
                  <DialogContent className="dContent">
                    <h2>Alert</h2>
                    <p>Contact not added. Do you want to continue without adding a contact?</p>
                  </DialogContent>
                  <DialogActions className="dAction">
                    <Button
                      variant="outlined"
                      onClick={() => setOpen(false)}
                      color="default"
                      className="btn"
                    >
                      No
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpen(false);
                        onConfirm();
                      }}
                      color="secondary"
                      className="btn ml-15"
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default NonAssociateContact;
