const axios = require('../axios');

module.exports = {
  read: {
    path: '/groups/:groupId/stats',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const { headers } = req;
      const stats = await axios.get(`/groups/${groupId}/stats`, {
        headers
      });

      res.status(200).json(stats.data);
    }
  }
};
