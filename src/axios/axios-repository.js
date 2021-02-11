import axios from './axios';

const AUTH_TOKEN = 'auth_token';

const service = {

  getCategories: () => {
    return axios.get('/api/category');
  },
  getGasses: () => {
    return axios.get('/api/gas');
  },
  getYear: (year) => {
    return axios.get(`/api/year/${year}`);
  },
  getYears: () => {
    return axios.get('/api/year');
  },
  getYearsByGas: (id) => {
    return axios.get(`/api/analysis/gas/${id}`)
  },
  getGasByYear: (id) => {
    return axios.get(`/api/gas/year/${id}`)
  },
  getAnalysis: () => {
    return axios.get('/api/analysis')
  },
  getAllByIds: (gasses, categories, analysis) => {
    return axios.get(`/api/analysis/all?gasIds=${gasses}&categoryIds=${categories}&analysisIds=${analysis}`)
  },
  login: (authInfo) => {
    return axios.post('/login', authInfo)
  },
  createAnalysis: (year, file) => {
    return axios.post(`/api/analysis/upload`, file, {
      headers: {
        'Content-Type': "multipart/form-data",
        'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
      }
    })
  },
  editYear: (year, newYear) => {
    return axios.put(`/api/analysis/${year}`, newYear, {
      headers: {
        'Content-Type': "multipart/form-data",
        'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
      }
    })
  },
  deleteYear: (id) => {
    return axios.delete(`/api/year/${id}`, {
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
      }
    });
  },

};

export default service;
