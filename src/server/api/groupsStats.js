const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  read: {
    path: '/groups/:groupId/stats',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const headers = extractProxyHeader(req);

      const config = { headers };
      const stats = await axios.get(`/groups/${groupId}/stats`, config);

      res.status(200).json(stats.data);
    }
  }
};
