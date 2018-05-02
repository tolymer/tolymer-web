const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  read: {
    path: '/auth/google/callback',
    handler: async (req, res) => {
      const { code } = req.query;
      const params = { code };
      const headers = extractProxyHeader(req);

      const config = { headers, params };
      const googleAuthCallback = await axios.get('/auth/google/callback', config);

      res.status(200).json(googleAuthCallback.data);
    }
  }
};
