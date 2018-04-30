const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  create: {
    path: '/users',
    handler: async (req, res) => {
      const { name, password } = req.body;

      const data = { name, password };
      const users = await axios.post(`/users`, data);

      res.status(201).json(users.data);
    }
  },
  read: {
    path: '/users/:userId',
    handler: async (req, res) => {
      const { userId } = req.params;

      const users = await axios.get(`/users/${userId}`);

      res.status(200).json(users.data);
    }
  },
  update: {
    path: '/users/:userId',
    handler: async (req, res) => {
      const { userId } = req.params;
      const { name, password } = req.body;
      const headers = extractProxyHeader(req);

      const data = { name, password };
      const config = { headers };
      const users = await axios.patch(`/users/${userId}`, data, config);

      res.status(200).json(users.data);
    }
  },
  delete: {
    path: '/users/:userId',
    handler: async (req, res) => {
      const { userId } = req.params;
      const headers = extractProxyHeader(req);

      const config = { headers };
      const user = await axios.delete(`/users/${userId}`, config);

      res.status(200).json(user.data);
    }
  }
};
