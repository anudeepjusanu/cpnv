import { BASE_URL } from './../utils/constants'
import axios from 'axios';

export const submitBasciInfo = (data) => {
    return axios.post(BASE_URL, data)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
}

export const updateBasciInfo = (data, id) => {
  return axios.put(`${BASE_URL}/${id}`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}


export const updateFormReson = (data, id) => {
  return axios.put(`${BASE_URL}/updateReason/${id}`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export const updateFormAssociate = (data, id) => {
  return axios.put(`${BASE_URL}/associates/${id}`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export const updateFormNonAssociate = (data, id) => {
  return axios.put(`${BASE_URL}/nonAssociates/${id}`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
