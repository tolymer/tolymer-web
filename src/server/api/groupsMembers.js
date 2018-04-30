const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  create: {
    path: '/groups/:groupId/members',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const headers = extractProxyHeader(req);

      const data = {};
      const config = { headers };
      const group = await axios.post(`/groups/${groupId}/members`, data, config);

      res.status(201).json(group.data);
    }
  },
  read: {
    path: '/groups/:groupId/members',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const headers = extractProxyHeader(req);

      const config = { headers };
      const group = await axios.get(`/groups/${groupId}/members`, config);

      res.status(200).json(group.data);
    }
  }
};
