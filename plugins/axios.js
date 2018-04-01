import axios from 'axios'

console.info(
  'baseURL',
  process.server ?
    process.env.apiBaseUrl :
    process.env.appBaseUrl + '/api'
)

export default axios.create({
  baseURL: process.server ?
    process.env.apiBaseUrl :
    process.env.appBaseUrl + '/api'
})
