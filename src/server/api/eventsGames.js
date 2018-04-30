const axios = require('../axios');
const extractProxyHeader = require('../extractProxyHeader');

module.exports = {
  create: {
    path: '/events/:eventId/games',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const { scores } = req.body;
      const headers = extractProxyHeader(req);

      const data = { scores };
      const config = { headers };
      const games = await axios.post(`/events/${eventId}/games`, data, config);

      res.status(201).json(games.data);
    }
  },
  read: {
    path: '/events/:eventId/games',
    handler: async (req, res) => {
      const { eventId } = req.params;
      const headers = extractProxyHeader(req);

      const config = { headers };
      const games = await axios.get(`/events/${eventId}/games`, config);

      res.status(200).json(games.data);
    }
  },
  delete: {
    path: '/events/:eventId/games/:gameId',
    handler: async (req, res) => {
      const { eventId, gameId } = req.params;
      const headers = extractProxyHeader(req);

      const config = { headers };
      const games = await axios.delete(`/events/${eventId}/games/${gameId}`, config);

      res.status(200).json(games.data);
    }
  }
};
