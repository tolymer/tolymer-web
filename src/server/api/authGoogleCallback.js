const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  read: {
    path: '/auth/google/callback',
    handler: async (req, res) => {
      const { code, state } = req.query;
      const params = { code, state };
      const headers = extractProxyHeader(req);

      const config = { headers, params };
      const googleAuthCallback = await axios.get('/auth/google/callback', config);

      res
        .status(200)
        .cookie('accessToken', googleAuthCallback.data.jwt, {
          axiosOnly: false,
          maxAge: 1000 * 60 * 60 * 24,
          secure: false
        })
        .json(googleAuthCallback.data);
    }
  }
};
