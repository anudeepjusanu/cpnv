import { BASE_URL } from './../utils/constants'
import axios from 'axios';

export const GetCaseDetails = (id) => {
    return axios.get(`${BASE_URL}/${id}?email=jennifer.marasco@cepheid.com`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
}

export const sendHrmReview = (data, id) => {
  return axios.put(`${BASE_URL}/addHRMReview/${id}`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}