const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  create: {
    path: '/events/:eventId/members',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { userIds } = req.body;
      const headers = extractProxyHeader(req);

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
    }
  },
  read: {
    path: '/events/:eventId/members',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const headers = extractProxyHeader(req);
      const members = await axios.get(`/events/${eventId}/members`, {
        headers
      });

      res.status(200).json(members.data);
    }
  }
};
