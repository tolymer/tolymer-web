const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  read: {
    path: '/current_user',
    handler: async (req, res) => {
      const headers = extractProxyHeader(req);
      const currentUser = await axios.get('/current_user', {
        headers
      });

      res.status(200).json(currentUser.data);
    }
  }
};
