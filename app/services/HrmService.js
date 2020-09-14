import { BASE_URL } from './../utils/constants';
import axios from 'axios';

export const GetCaseDetails = id => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'));
  axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken.value}`;
  return axios
    .get(`${BASE_URL}/${id}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export const sendHrmReview = (data, id) => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'));
  axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken.value}`;
  return axios
    .post(`${BASE_URL}/addHRMReview/${id}`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export const GetCaseList = () => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'));
  axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken.value}`;
  return axios
    .get(`${BASE_URL}/cases`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};