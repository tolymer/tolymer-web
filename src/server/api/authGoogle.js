const { parse } = require('cookie');
const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  read: {
    path: '/auth/google',
    handler: async (req, res) => {
      const headers = extractProxyHeader(req);
      const maxRedirects = 0;
      const validateStatus = status => status >= 200 && status < 400;

      const config = { headers, maxRedirects, validateStatus };
      const googleAuth = await axios.get('/auth/google', config);

      const { location } = googleAuth.headers;
      const cookie = parse(googleAuth.headers['set-cookie'][0]);
      const key = '_interslice_session';
      const value = cookie[key];

      res
        .status(200)
        .cookie(key, value)
        .json({ location });
    }
  }
};
