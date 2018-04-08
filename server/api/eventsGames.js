const axios = require('axios')
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000'

module.exports = {
  create: {
    path: '/events/:eventId/games',
    handler: async (req, res) => {
      const { eventId } = req.params
      const { scores } = req.body
      const { headers } = req

      try {
        const games = await axios.post(`${apiBaseUrl}/events/${eventId}/games`, {
          scores
        }, {
          headers
        })

        res.status(201).json(games.data)
      } catch (e) {
        res.status(404).json({})
      }
    }
  },
  read: {
    path: '/events/:eventId/games',
    handler: async (req, res) => {
      const { eventId } = req.params
      const { headers } = req

      try {
        const games = await axios.get(`${apiBaseUrl}/events/${eventId}/games`, {
          headers
        })

        res.status(200).json(games.data)
      } catch (e) {
        res.status(404).json({})
      }
    }
  },
  update: {
    path: '/events/:eventId/games',
    handler: async (req, res) => res.status(403).json({})
  },
  delete: {
    path: '/events/:eventId/games',
    handler: async (req, res) => res.status(403).json({})
  }
}
