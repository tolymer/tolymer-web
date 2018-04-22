const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  create: {
    path: '/users',
    handler: async (req, res) => {
      const { name, password } = req.body;
      const users = await axios.post(`/users`, {
        name,
        password
      });

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
      const users = await axios.patch(
        `/users/${userId}`,
        {
          name,
          password
        },
        {
          headers
        }
      );

      res.status(200).json(users.data);
    }
  },
  delete: {
    path: '/users/:userId',
    handler: async (req, res) => {
      const { userId } = req.params;
      const headers = extractProxyHeader(req);
      const user = await axios.delete(
        `/users/${userId}`,
        {},
        {
          headers
        }
      );

      res.status(200).json(user.data);
    }
  }
};
