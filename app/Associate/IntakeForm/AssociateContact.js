import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Button,
  Typography,
  Switch,
  withStyles,
} from '@material-ui/core';
import AssociateContactForm from './AssociateContactForm';
import FormContext from 'FormContext';
import { updateFormAssociate } from './../../services/intakeFormService';

const AssociateContact = props => {
  const { basicInfo, updateFormData } = useContext(FormContext);
  const [contacts, setContacts] = useState([]);

  const submitAssociateContact = () => {
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
  return (
    <React.Fragment>
      <Grid container className="stepperSpace">
        <Grid item md={11}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
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
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AssociateContact;
