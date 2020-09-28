import { API_URL } from './../utils/constants';
import axios from 'axios';

export const submitBasciInfo = data => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .post(`${API_URL}/associate/case`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export const updateBasciInfo = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .put(`${API_URL}/associate/case/${id}`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export const updateFormReson = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .put(`${API_URL}/associate/case/updateReason/${id}`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export const updateFormAssociate = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .put(`${API_URL}/associate/case/associates/${id}`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export const updateFormNonAssociate = (data, id) => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .put(`${API_URL}/associate/case/nonAssociates/${id}`, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export const getDepartments = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token',
  )}`;
  return axios
    .get(`${API_URL}/meta/departments`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
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