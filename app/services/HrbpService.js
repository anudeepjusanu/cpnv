import { BASE_URL } from './../utils/constants';
import axios from 'axios';

export const GetCaseDetails = id => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'));
  axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken.value}`;
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
  const token = JSON.parse(localStorage.getItem('okta-token-storage'));
  axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken.value}`;
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

export const sendFinalAction = (data, id) => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'));
  axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken.value}`;
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
  const token = JSON.parse(localStorage.getItem('okta-token-storage'));
  axios.defaults.headers.common.Authorization = `Bearer ${token.accessToken.value}`;
  return axios
    .put(`${BASE_URL}/caseClose/${id}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};