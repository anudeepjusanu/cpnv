import React, { useState, useEffect } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
//import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px',
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  form: {
    // paddingLeft: 100,
    // paddingRight: 100,
    // paddingBottom: 125,
    // flexBasis: 700,
    // [theme.breakpoints.down('sm')]: {
    //   paddingLeft: theme.spacing(2),
    //   paddingRight: theme.spacing(2),
    // },
  },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LoginForm = ({ issuer }) => {
  const classes = useStyles();
  const { authService } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [mfa, setMfa] = useState({});
  const [answer, setAnswer] = useState('');
  const [showForm, setShowFrom] = useState(true);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const errors = false;

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleSubmit = e => {
    e.preventDefault();
    const oktaAuth = new OktaAuth({ issuer: issuer });
    oktaAuth
      .signIn({
        username: formState.values.email,
        password: formState.values.password,
      })
      .then(res => {
        if (res.status === 'MFA_REQUIRED') {
          setMfa(res.factors[0]);
          setShowFrom(false);
        } else {
          setSessionToken(res.sessionToken);
        }
      })
      .catch(err => {
        //console.log('Found an error', err);
        let message = '';
        if (err && err.message) {
          message = err.message;
        } else {
          message = 'Something went wrong please contact admin!!';
        }
        setSeverity('error');
        setMessage(message);
        setOpen(true);
      });
  };

  const handleQuestionChange = e => {
    setAnswer(e.target.value);
  };

  const verifyQuestion = e => {
    mfa
      .verify({
        answer: answer,
      })
      .then(
        res => {
          setSessionToken(res.sessionToken);
        },
        err => {
          console.log(err);
          let message = '';
          if (err && err.message) {
            message = err.message;
          } else {
            message = 'Something went wrong please contact admin!!';
          }
          setSeverity('error');
          setMessage(message);
          setOpen(true);
        },
      );
  };

  if (sessionToken) {
    authService.redirect({ sessionToken });
    return null;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {showForm ? (
        <div className={classes.root}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Typography variant="h4">
              Sign in
            </Typography>
            <Grid container spacing={2} className="userloginWrap">
              <Grid item md={12}>
                <TextField
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                  className="inputField"
                  size="small"
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                  className="inputField"
                  size="small"
                />
              </Grid>
              <Grid item md={12}>
                <Button
                  className="btn medium continue_action userActionBtn"
                  color="secondary"
                  disabled={!formState.isValid}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      ) : (
          <form className={classes.form}>
            <Typography className={classes.title} variant="h4">
              Please answer the security question
          </Typography>
            <TextField
              className={classes.textField}
              label={mfa.profile.questionText}
              name="answer"
              onChange={handleQuestionChange}
              type="password"
              value={answer}
              fullWidth
              variant="outlined"
            />
            <Button
              className="btn medium continue_action userActionBtn"
              color="secondary"
              size="large"
              variant="contained"
              onClick={verifyQuestion}
            >
              Submit
          </Button>
          </form>
        )}
    </div>
  );
};
export default LoginForm;


{/* <label>
    {mfa.profile.questionText}:
    <input
    id="username" type="text"
    value={answer}
    onChange={handleQuestionChange} />
</label> */}