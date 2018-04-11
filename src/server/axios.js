const axios = require("axios");

module.exports = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3000"
});
