import { BASE_URL, API_URL } from './../utils/constants';
import axios from 'axios';

export const submitBasciInfo = data => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .post(BASE_URL, data)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};

export const updateBasciInfo = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .put(`${BASE_URL}/${id}`, data)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};

export const updateFormReson = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .put(`${BASE_URL}/updateReason/${id}`, data)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};

export const updateFormAssociate = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .put(`${BASE_URL}/associates/${id}`, data)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};

export const updateFormNonAssociate = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .put(`${BASE_URL}/nonAssociates/${id}`, data)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};

export const getDepartments = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .get(`${API_URL}/meta/departments`)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
  }

export const getBuildings = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .get(`${API_URL}/meta/buildings`)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
  };


export const getSymptoms = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .get(`${API_URL}/meta/symptoms`)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
  };