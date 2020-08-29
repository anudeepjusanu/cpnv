import { API_URL } from './../utils/constants';
import axios from 'axios';

export const login = email => {
  return axios
    .get(API_URL + 'users/associate?email=' + email)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};

export const roleLogin = user => {
  return axios
    .post(API_URL + 'users/login', user)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};
