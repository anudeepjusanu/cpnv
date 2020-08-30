import { BASE_URL } from './../utils/constants';
import axios from 'axios';

export const GetCaseDetails = id => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .get(`${BASE_URL}/${id}`)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};

export const sendHrmReview = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .post(`${BASE_URL}/addHRMReview/${id}`, data)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};
