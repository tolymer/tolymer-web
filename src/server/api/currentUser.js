const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  read: {
    path: '/current_user',
    handler: async (req, res) => {
      const headers = extractProxyHeader(req);

      const config = { headers };
      const currentUser = await axios.get('/current_user', config);

      res.status(200).json(currentUser.data);
    }
  }
};
