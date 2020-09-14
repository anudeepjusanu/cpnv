import { BASE_URL } from './../utils/constants';
import axios from 'axios';

export const sendCaseForReview = (data, id) => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'));
  return axios
    .post(`${BASE_URL}/addCRTReview/${id}`, data)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const GetCaseDetails = id => {
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
