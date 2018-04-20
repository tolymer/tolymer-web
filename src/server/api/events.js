const axios = require('../axios');

module.exports = {
  create: {
    path: '/events',
    handler: async (req, res) => {
      const { title, description, date } = req.body;
      const { headers } = req;

      try {
        const event = await axios.post(
          `/events`,
          {
            title,
            description,
            date
          },
          {
            headers
          }
        );

        res.status(201).json(event.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  read: {
    path: '/events/:eventId',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { headers } = req;

      try {
        const event = await axios.get(`/events/${eventId}`, {
          headers
        });

        res.status(200).json(event.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  update: {
    path: '/events/:eventId',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { title, description, date } = req.body;
      const { headers } = req;

      try {
        const event = await axios.patch(
          `/events/${eventId}`,
          {
            title,
            description,
            date
          },
          {
            headers
          }
        );

        res.status(200).json(event.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  delete: {
    path: '/events/:eventId',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { headers } = req;

      try {
        const event = await axios.delete(
          `/events/${eventId}`,
          {},
          {
            headers
          }
        );

        res.status(200).json(event.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  }
};
