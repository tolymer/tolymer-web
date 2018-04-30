const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  create: {
    path: '/groups',
    handler: async (req, res) => {
      const { name, description } = req.body;
      const headers = extractProxyHeader(req);

      const data = { name, description };
      const config = { headers };
      const group = await axios.post(`/groups`, data, config);

      res.status(201).json(group.data);
    }
  },
  read: {
    path: '/groups/:groupId',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const headers = extractProxyHeader(req);

      const config = { headers };
      const group = await axios.get(`/groups/${groupId}`, config);

      res.status(200).json(group.data);
    }
  },
  update: {
    path: '/groups/:groupId',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const { name, description } = req.body;
      const headers = extractProxyHeader(req);

      const data = { name, description };
      const config = { headers };
      const group = await axios.patch(`/groups/${groupId}`, data, config);

      res.status(201).json(group.data);
    }
  },
  delete: {
    path: '/groups/:groupId',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const headers = extractProxyHeader(req);

      const config = { headers };
      const group = await axios.delete(`/groups/${groupId}`, config);

      res.status(201).json(group.data);
    }
  }
};
