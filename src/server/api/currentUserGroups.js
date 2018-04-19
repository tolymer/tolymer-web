const axios = require('../axios');

module.exports = {
  create: {
    path: '/current_user/groups',
    handler: async (req, res) => res.status(403).json({})
  },
  read: {
    path: '/current_user/groups',
    handler: async (req, res) => {
      const { headers } = req;

      try {
        const currentUserGroups = await axios.get(`/current_user/groups`, {
          headers
        });

        res.status(200).json(currentUserGroups.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  update: {
    path: '/current_user/groups',
    handler: async (req, res) => res.status(403).json({})
  },
  delete: {
    path: '/current_user/groups',
    handler: async (req, res) => res.status(403).json({})
  }
};
