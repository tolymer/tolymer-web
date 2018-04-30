const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  create: {
    path: '/events/:eventId/members',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { userIds } = req.body;
      const headers = extractProxyHeader(req);

      const data = { user_ids: userIds };
      const config = { headers };
      const members = await axios.post(`/events/${eventId}/members`, data, config);

      res.status(201).json(members.data);
    }
  },
  read: {
    path: '/events/:eventId/members',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const headers = extractProxyHeader(req);

      const config = { headers };
      const members = await axios.get(`/events/${eventId}/members`, config);

      res.status(200).json(members.data);
    }
  }
};
