const axios = require('../axios');

module.exports = {
  read: {
    path: '/groups/:groupId/stats',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const { headers } = req;

      try {
        const stats = await axios.get(`/groups/${groupId}/stats`, {
          headers
        });

        res.status(200).json(stats.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  }
};
