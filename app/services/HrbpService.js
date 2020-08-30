import { BASE_URL } from './../utils/constants';
import axios from 'axios';

export const GetCaseDetails = id => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .get(`${BASE_URL}/${id}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const sendCaseForReview = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .put(`${BASE_URL}/changeToReview/${id}`, data)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const GetCaseList = id => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .get(`${BASE_URL}/cases`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const sendFinalAction = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .post(`${BASE_URL}/caseFinalAction/${id}`, data)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const CloseCase = (id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .put(`${BASE_URL}/caseClose/${id}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};