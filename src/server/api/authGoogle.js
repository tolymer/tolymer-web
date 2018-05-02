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

      res.status(200).json({ location });
    }
  }
};
