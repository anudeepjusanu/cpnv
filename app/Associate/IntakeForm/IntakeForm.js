import React from 'react';
import { Typography, Grid, Button, makeStyles, withStyles, Stepper, Step, StepLabel, StepContent, Paper, StepConnector  } from '@material-ui/core';
import BasicInfo from './BasicInfo';
import ReasonIntake from './ReasonIntake/ReasonIntake';

const useStyles = makeStyles((theme) => ({
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

const QontoConnector = withStyles((theme) => ({
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
  return ['Basic Info', 'Reason for Intake', 'Associate’s Contacts', 'Non-Associate’s Contacts'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <BasicInfo />
      );
    case 1:
      return (
        <ReasonIntake />
      );
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

const IntakeForm = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <React.Fragment>
      <Grid className="bodyText1">
        <Typography variant="body1" gutterBottom>
          The purpose of this form it to collect relevant details for tracking and monitoring.
        </Typography>
      </Grid>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical" className="stepperWrap"  connector={<QontoConnector />}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {getStepContent(index)}

                <div className={classes.actionsContainer}>
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
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    </React.Fragment>
  );
};

export default IntakeForm;
