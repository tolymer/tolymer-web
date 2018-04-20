const axios = require('../axios');

module.exports = {
  create: {
    path: '/users',
    handler: async (req, res) => {
      const { name, password } = req.body;

      try {
        const users = await axios.post(`/users`, {
          name,
          password
        });

        res.status(201).json(users.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  read: {
    path: '/users/:userId',
    handler: async (req, res) => {
      const { userId } = req.params;

      try {
        const users = await axios.get(`/users/${userId}`);

        res.status(200).json(users.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  update: {
    path: '/users/:userId',
    handler: async (req, res) => {
      const { userId } = req.params;
      const { name, password } = req.body;
      const { headers } = req;

      try {
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
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  delete: {
    path: '/users/:userId',
    handler: async (req, res) => {
      const { userId } = req.params;
      const { headers } = req;

      try {
        const user = await axios.delete(
          `/users/${userId}`,
          {},
          {
            headers
          }
        );

        res.status(200).json(user.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  }
};
