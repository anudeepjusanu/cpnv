import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Button,
  Typography,
  Switch,
  withStyles,
} from '@material-ui/core';
import NAContact from './NAContact';
import history from 'utils/history';
import FormContext from 'FormContext';
import { useAlert } from 'react-alert';
import { updateFormNonAssociate } from './../../services/intakeFormService';

const NonAssociateContact = props => {
  const alert = useAlert()
  const [contacts, setContacts] = useState([]);
  const { basicInfo, updateFormData }  = useContext(FormContext);

  const addContacts = (contact) => {
    setContacts(contact);
  }

  const submitNoAssociateContact = () => {
    const req = contacts
    updateFormNonAssociate(req, basicInfo.intakeId).then( res => {
      updateFormData('nonAssociates', req);
      props.handleNext();
      history.push(`/intakeForm/success`);
      // alert.show('Intake form submitted successfully', {
      //   type: 'success',
      // });
    }).catch(err=>{
      console.log('errrrrr', err);
      alert.show('something went wrong!!', {
        type: 'error',
      });
    });
    props.handleNext('associateContact');
  }

  return (
    <React.Fragment>
      <Grid container className="stepperSpace">
        <Grid item md={11}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Who, if anyone, have you been in contact with at Cepheid over the last 2 weeks since the time of the exposure, symptom onset or diagnosis?
              </Typography>
              <NAContact contactArray={addContacts}/>
            </Grid>
            <Grid item xs={12} className="action_mob_fix">
              <div className="text-left-btn tabFormActionTopSpace">
                <Button
                  type="reset"
                  variant="outlined"
                  color="primary"
                  className="btn medium cancel_action"
                  size="large"
                  onClick={()=>props.handleBack(4)}
                >
                  Cancel
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
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default NonAssociateContact;
