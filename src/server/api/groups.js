const axios = require('../axios');

module.exports = {
  create: {
    path: '/groups',
    handler: async (req, res) => {
      const { name, description } = req.body;
      const { headers } = req;
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
    }
  },
  read: {
    path: '/groups/:groupId',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const { headers } = req;
      const group = await axios.get(`/groups/${groupId}`, {
        headers
      });

      res.status(200).json(group.data);
    }
  },
  update: {
    path: '/groups/:groupId',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const { name, description } = req.body;
      const { headers } = req;
      const group = await axios.patch(
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
    }
  },
  delete: {
    path: '/groups/:groupId',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const { headers } = req;
      const group = await axios.delete(
        `/groups/${groupId}`,
        {},
        {
          headers
        }
      );

      res.status(201).json(group.data);
    }
  }
};
