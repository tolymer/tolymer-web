const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  create: {
    path: '/groups/:groupId/members',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const headers = extractProxyHeader(req);
      const group = await axios.post(
        `/groups/${groupId}/members`,
        {},
        {
          headers
        }
      );

      res.status(201).json(group.data);
    }
  },
  read: {
    path: '/groups/:groupId/members',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const headers = extractProxyHeader(req);
      const group = await axios.get(`/groups/${groupId}/members`, {
        headers
      });

      res.status(200).json(group.data);
    }
  }
};
