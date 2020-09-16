import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Button,
  Typography,
  Switch,
  withStyles,
  IconButton
} from '@material-ui/core';
import AssociateContactForm from './AssociateContactForm';
import FormContext from 'FormContext';
import { updateFormAssociate } from './../../services/intakeFormService';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const AssociateContact = props => {
  const { basicInfo, updateFormData, associates } = useContext(FormContext);
  const [contacts, setContacts] = useState(associates);
  const [isOpen, setOpen] = useState(false);

  const submitAssociateContact = () => {
    if(!contacts.length) {
      setOpen(true);
      return;
    }
    const req = contacts;
    updateFormAssociate(req, basicInfo.intakeId)
      .then(res => {
        updateFormData('associates', req);
        props.handleNext();
      })
      .catch(err => {
        console.log('errrrrr', err);
      });
    props.handleNext('associateContact');
  };

  const addContacts = contact => {
    setContacts(contact);
  };

  const onConfirm = () => {
    const req = contacts;
    updateFormAssociate(req, basicInfo.intakeId)
      .then(res => {
        updateFormData('associates', req);
        props.handleNext();
      })
      .catch(err => {
        console.log('errrrrr', err);
      });
    props.handleNext('associateContact');
  }
  
  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => props.handleBack(3)}
        className={`headerBackArrow`}
      >
        <ArrowBackIcon />
      </IconButton>
      <Grid container className="stepperSpace">
        <Grid item md={11}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1" class="m-b-20" gutterBottom>
                Who, if anyone, have you been in contact with at Cepheid over
                the last 2 weeks since the time of the exposure, symptom onset
                or diagnosis?
              </Typography>
              <AssociateContactForm contactArray={addContacts} />
            </Grid>
            <Grid item xs={12} className="action_mob_fix">
              <div className="text-left-btn tabFormActionTopSpace">
                <Button
                  type="reset"
                  variant="outlined"
                  color="primary"
                  className="btn medium cancel_action"
                  size="large"
                  onClick={() => props.handleBack(3)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  size="large"
                  className="btn medium ml-15 continue_action"
                  onClick={submitAssociateContact}
                >
                  Continue
                </Button>
                <Dialog
                  open={isOpen}
                  onClose={() => setOpen(false)}
                  aria-labelledby="confirm-dialog"
                >
                  <DialogTitle id="confirm-dialog"><h2>Alert</h2></DialogTitle>
                  <DialogContent>Contact not added, Do you want to continue without Associate's cotacts ?</DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      onClick={() => setOpen(false)}
                      color="default"
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

export default AssociateContact;
