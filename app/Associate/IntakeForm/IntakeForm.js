import React from 'react';
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  withStyles,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  StepConnector,
} from '@material-ui/core';
import BasicInfo from './BasicInfo';
import ReasonIntake from './ReasonIntake/ReasonIntake';
import AssociateContact from './AssociateContact';
import NonAssociateContact from './NonAssociateContact';
import FormContext from 'FormContext';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const QontoConnector = withStyles(theme => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    color: theme.palette.secondary.dark,
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    color: theme.palette.secondary.dark,
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    display: 'none',
  },
}))(StepConnector);

function getSteps() {
  return [
    'Basic Info',
    'Reason for Intake',
    'Associate’s Contacts',
    'Non-Associate’s Contacts',
  ];
}

const IntakeForm = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [basicInfo, setBasicInfoData] = React.useState({});
  const [intakeId, setFormIntakeId] = React.useState('');
  const [formData, setFormData] = React.useState({
    basicInfo: {},
    resonForIntake: {},
    associates: [],
    nonAssociates: [],
  });

  const steps = getSteps();

  const handleNext = fromStep => {
    switch (fromStep) {
      case 'basicInfo':
        setActiveStep(1);
        break;
      case 'reasonIntake':
        setActiveStep(2);
        break;
      case 'associateContact':
        setActiveStep(3);
        break;
      case 'nonAssociateContact':
        setActiveStep(4);
        break;
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const updateFormData = (key, value) => {
    const tempData = { ...formData };
    tempData[key] = value;
    setFormData({ ...formData, ...tempData });
  };

  const setIntakeId = value => {
    setFormData({
      ...formData,
      intakeId: value,
    });
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <BasicInfo handleNext={handleNext} handleBack={handleBack} />;
      case 1:
        return (
          <ReasonIntake
            handleNext={handleNext}
            handleBack={handleBack}
            intakeId={intakeId}
          />
        );
      case 2:
        return (
          <AssociateContact
            handleNext={handleNext}
            handleBack={handleBack}
            intakeId={intakeId}
          />
        );
      case 3:
        return (
          <NonAssociateContact
            handleNext={handleNext}
            handleBack={handleBack}
            intakeId={intakeId}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <FormContext.Provider value={{ ...formData, updateFormData }}>
      <Grid className="bodyText1">
        <Typography variant="body1" gutterBottom>
          The purpose of this form it to collect relevant details for tracking
          and monitoring.
        </Typography>
      </Grid>
      <div className={classes.root}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className="stepperWrap"
          connector={<QontoConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent className="stepContent">
                {getStepContent(index)}

                {/* <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div> */}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    </FormContext.Provider>
  );
};

export default IntakeForm;
