import axios from './axios';

const service = {

  getCategories: () => {
    return axios.get('/api/category');
  },
  getGasses: () => {
    return axios.get('/api/gas');
  },
  getYears: () => {
    return axios.get('/api/analysis');
  },
  getYearsByGas: (id) => {
    return axios.get(`/api/analysis/gas/${id}`)
  },
  getGasByYear: (id) => {
    return axios.get(`api/gas/year/${id}`)
  }
};

export default service;
