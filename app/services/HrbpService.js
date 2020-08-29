import { BASE_URL } from './../utils/constants'
import axios from 'axios';

export const GetCaseDetails = (id) => {
    return axios.get(`${BASE_URL}/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
}