const axios = require('../axios');

module.exports = {
  create: {
    path: '/events/:eventId/games',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { scores } = req.body;
      const { headers } = req;
      const games = await axios.post(
        `/events/${eventId}/games`,
        {
          scores
        },
        {
          headers
        }
      );

      res.status(201).json(games.data);
    }
  },
  read: {
    path: '/events/:eventId/games',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { headers } = req;
      const games = await axios.get(`/events/${eventId}/games`, {
        headers
      });

      res.status(200).json(games.data);
    }
  }
};
