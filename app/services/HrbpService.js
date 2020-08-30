import { BASE_URL } from './../utils/constants'
import axios from 'axios';

export const GetCaseDetails = (id) => {
    return axios.get(`${BASE_URL}/${id}?email=jennifer.marasco@cepheid.com`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
}

export const sendCaseForReview = (data, id) => {
  return axios.put(`${BASE_URL}/changeToReview/${id}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export const GetCaseList = (id) => {
  return axios.get(`${BASE_URL}/cases/?email=jennifer.marasco@cepheid.com`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}