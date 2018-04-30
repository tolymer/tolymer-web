const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  create: {
    path: '/events',
    handler: async (req, res) => {
      const { title, description, date } = req.body;
      const headers = extractProxyHeader(req);

      const data = { title, description, date };
      const config = { headers };
      const event = await axios.post(`/events`, data, config);

      res.status(201).json(event.data);
    }
  },
  read: {
    path: '/events/:eventId',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const headers = extractProxyHeader(req);

      const config = { headers };
      const event = await axios.get(`/events/${eventId}`, config);

      res.status(200).json(event.data);
    }
  },
  update: {
    path: '/events/:eventId',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { title, description, date } = req.body;
      const headers = extractProxyHeader(req);

      const data = { title, description, date };
      const config = { headers };
      const event = await axios.patch(`/events/${eventId}`, data, config);

      res.status(200).json(event.data);
    }
  },
  delete: {
    path: '/events/:eventId',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const headers = extractProxyHeader(req);

      const config = { headers };
      const event = await axios.delete(`/events/${eventId}`, config);

      res.status(200).json(event.data);
    }
  }
};
