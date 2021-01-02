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
  },
  getAnalysis: () => {
    return axios.get('api/analysis/all')
  },
  getAllByIds: (gasses, categories, analysis) => {
    return axios.get(`api/analysis/all/data?gasIds=${gasses}&categoryIds=${categories}&analysisIds=${analysis}`)
  }
};

export default service;
