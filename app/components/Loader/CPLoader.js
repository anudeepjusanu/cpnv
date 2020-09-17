import React from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import Loader from 'react-loader-spinner';

const CPLoader = () => {
  return (
    <Grid className="loader">
      <Loader type="ThreeDots" color="#127AC2" height={80} width={80} />
    </Grid>
  )
};

export default CPLoader;
