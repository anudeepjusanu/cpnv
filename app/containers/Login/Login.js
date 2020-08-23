/*
 * Login
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component, useState } from 'react';
import Button from '@material-ui/core/Button';
import Recaptcha from 'react-recaptcha';
import history from "utils/history";

function Login(props) {
 
  const [isVerified, setIsVerified] = useState(false)

  const recaptchaLoaded = () => {
    console.log('capcha successfully loaded');
  }

  const handleSubscribe = () => {
    if (isVerified) {
      history.push(`/intakeForm`);
    } else {
      alert('Please verify that you are a human!');
    }
  }

  const verifyCallback = (response) => {
    if (response) {
      setIsVerified(true);
    }
  }

    return (
        <div className="App-intro">
          <input type="text" placeholder="email@company.com" />

          <Button
            className="convert"
            onClick={handleSubscribe}
          >Subscribe</Button>

          <Recaptcha
            sitekey="6LfAQcIZAAAAAKhP-NoTdl4GzwyBXenhjKwoxXOv"
            render="explicit"
            onloadCallback={recaptchaLoaded}
            verifyCallback={verifyCallback}
          />
        </div>
    );
}

export default Login;
