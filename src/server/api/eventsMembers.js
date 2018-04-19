const axios = require('../axios');

module.exports = {
  create: {
    path: '/events/:eventId/members',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { userIds } = req.body;
      const { headers } = req;

      try {
        const members = await axios.post(
          `/events/${eventId}/members`,
          {
            user_ids: userIds
          },
          {
            headers
          }
        );

        res.status(201).json(members.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  read: {
    path: '/events/:eventId/members',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { headers } = req;

      try {
        const members = await axios.get(`/events/${eventId}/members`, {
          headers
        });

        res.status(200).json(members.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  update: {
    path: '/events/:eventId/members',
    handler: async (req, res) => res.status(403).json({})
  },
  delete: {
    path: '/events/:eventId/members',
    handler: async (req, res) => res.status(403).json({})
  }
};
