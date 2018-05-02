const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  read: {
    path: '/auth/google',
    handler: async (req, res) => {
      const headers = extractProxyHeader(req);

      const config = { headers };
      const googleAuth = await axios.get('/auth/google', config);

      res.status(301).redirect(googleAuth.data);
    }
  }
};
