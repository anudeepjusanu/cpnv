import { BASE_URL } from './../utils/constants';
import axios from 'axios';

export const sendCaseForReview = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
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
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .get(`${BASE_URL}/${id}?email=jennifer.marasco@cepheid.com`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
