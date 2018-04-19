const axios = require('../axios');

module.exports = {
  create: {
    path: '/groups',
    handler: async (req, res) => {
      const { name, description } = req.body;
      const { headers } = req;

      try {
        const group = await axios.post(
          `/groups`,
          {
            name,
            description
          },
          {
            headers
          }
        );

        res.status(201).json(group.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  read: {
    path: '/groups/:groupId',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const { headers } = req;

      try {
        const group = await axios.get(`/groups/${groupId}`, {
          headers
        });

        res.status(200).json(group.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  update: {
    path: '/groups/:groupId',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const { name, description } = req.body;
      const { headers } = req;

      try {
        const group = await axios.post(
          `/groups/${groupId}`,
          {
            name,
            description
          },
          {
            headers
          }
        );

        res.status(201).json(group.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  delete: {
    path: '/groups',
    handler: async (req, res) => res.status(403).json({})
  }
};
