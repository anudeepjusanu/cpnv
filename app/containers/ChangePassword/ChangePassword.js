/*
 * ChangePassword
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Component, useState, useEffect } from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import history from 'utils/history';
import Logo from 'images/Cepheid-logo-white.svg';
import './style.scss';
import { updatePassword } from 'services/LoginService';
import Loader from 'react-loader-spinner';
import { useAlert } from 'react-alert';

function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewOldPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const alert = useAlert();

  const changePassword = () => {
    if(oldPassword == ''){
      alert.show('Please Enter Old Password', {
        type: 'error',
      });
      return;
    } else if(newPassword == '') {
      alert.show('Please Enter New Password', {
        type: 'error',
      });
      return;
    }
    setShowLoading(true);
    const user = {
      "email": JSON.parse(localStorage.getItem('user')).email,
      "oldPassword": oldPassword,
      "newPassword": newPassword
  }
  updatePassword(user).then(res=>{
    setOldPassword('');
    setNewOldPassword('');
    setShowLoading(false);
    alert.show('Password changed successfully', {
      type: 'success',
    });
  }).catch(err=>{
    console.log(err);
  })
    console.log('SUBMIT');
  };

  const cancelHandler = () => {
    console.log('Cancel');
  };

  const handleInputChange = (value, type) => {
    if (type === 'new') {
      setNewOldPassword(value);
    } else {
      setOldPassword(value);
    }
  };

  useEffect(() => {}, []);

  return (
    <Grid container className="ChangePasswordWrap">
      <Grid>
          {showLoading && (
            <Grid className="loader">
              <Loader type="ThreeDots" color="#127AC2" height={80} width={80} />
            </Grid>
          )}
          <Grid container spacing="2">
            <Grid item md="4">
              <Grid container spacing="2">
                <Grid item md={10}>
                  <div className="form-control">
                    <TextField
                      fullWidth
                      id="email"
                      label="Email"
                      variant="outlined"
                      className="inputField"
                      size="small"
                      value={JSON.parse(localStorage.getItem('user')).email}
                      disabled={true}
                    />
                  </div>
                </Grid>
                <Grid item md={10}>
                  <div className="form-control">
                    <TextField
                      fullWidth
                      id="oldPassword"
                      label="Old Password"
                      type="password"
                      variant="outlined"
                      className="inputField"
                      size="small"
                      value={oldPassword}
                      onChange={e => {
                        handleInputChange(e.target.value, 'old');
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={10}>
                  <div className="form-control">
                    <TextField
                      fullWidth
                      id="newPassword"
                      label="New Password"
                      variant="outlined"
                      type="password"
                      className="inputField"
                      size="small"
                      value={newPassword}
                      onChange={e => {
                        handleInputChange(e.target.value, 'new');
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={12}>
                  <Grid className="actionWrap">
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      size="large"
                      className="btn medium continue_action"
                      onClick={changePassword}
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      color="primary"
                      size="large"
                      className="btn medium continue_action ml-10"
                      onClick={cancelHandler}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  );
}

export default ChangePassword;
