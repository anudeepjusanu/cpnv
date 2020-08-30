import { BASE_URL } from './../utils/constants'
import axios from 'axios';

export const sendCaseForReview = (data, id) => {
    return axios.post(`${BASE_URL}/addCRTReview/${id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  export const GetCaseDetails = (id) => {
    return axios.get(`${BASE_URL}/${id}?email=jennifer.marasco@cepheid.com`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
}