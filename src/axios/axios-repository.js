import axios from './axios';

const AUTH_TOKEN = 'auth_token';

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
  },
  login: (authInfo) => {
    return axios.post('/login', authInfo)
  },
  createAnalysis: (year, file) => {
    return axios.post(`api/analysis/upload/${year}`, file, {
      headers: {
        'Content-Type': "multipart/form-data",
        'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
      }
    })
  }
};

export default service;
