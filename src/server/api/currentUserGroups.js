const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  create: {
    path: '/current_user/groups',
    handler: async (req, res) => res.status(404).json({})
  },
  read: {
    path: '/current_user/groups',
    handler: async (req, res) => {
      const headers = extractProxyHeader(req);

      const config = { headers };
      const currentUserGroups = await axios.get(`/current_user/groups`, config);

      res.status(200).json(currentUserGroups.data);
    }
  }
};
