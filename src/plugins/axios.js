import axios from 'axios';

export default axios.create({
  baseURL: process.server ? process.env.apiBaseUrl : process.env.appBaseUrl + '/api'
});
