const axios = require('../axios');

module.exports = {
  create: {
    path: '/current_user/groups',
    handler: async (req, res) => res.status(404).json({})
  },
  read: {
    path: '/current_user/groups',
    handler: async (req, res) => {
      const { headers } = req;
      const currentUserGroups = await axios.get(`/current_user/groups`, {
        headers
      });

      res.status(200).json(currentUserGroups.data);
    }
  }
};
