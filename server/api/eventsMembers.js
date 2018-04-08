const axios = require('axios')
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000'

module.exports = {
  create: {
    path: '/events/:eventId/members',
    handler: async (req, res) => {
      const { eventId } = req.params
      const { userIds } = req.body
      const { headers } = req

      try {
        const members = await axios.post(`${apiBaseUrl}/events/${eventId}/members`, {
          user_ids: userIds
        }, {
          headers
        })

        res.status(201).json(members.data)
      } catch (e) {
        res.status(404).json({})
      }
    }
  },
  read: {
    path: '/events/:eventId/members',
    handler: async (req, res) => {
      const { eventId } = req.params
      const { headers } = req

      try {
        const members = await axios.get(`${apiBaseUrl}/events/${eventId}/members`, {
          headers
        })

        res.status(200).json(members.data)
      } catch (e) {
        res.status(404).json({})
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
}
