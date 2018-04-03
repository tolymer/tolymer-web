const axios = require('axios')
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000'

module.exports = {
  create: {
    path: '/groups/:groupId/events',
    handler: async (req, res) => {
      const { groupId } = req.params
      const { title, description, date } = req.body
      const { headers } = req

      try {
        const event = await axios.post(`${apiBaseUrl}/groups/${groupId}/events`, {
          title,
          description,
          date
        }, {
          headers
        })

        res.status(201).json(event.data)
      } catch (e) {
        res.status(404).json({})
      }
    }
  },
  read: {
    path: '/groups/:groupId/events',
    handler: async (req, res) => {
      const { groupId } = req.params
      const { headers } = req

      try {
        const events = await axios.get(`${apiBaseUrl}/groups/${groupId}/events`, {
          headers
        })

        res.status(200).json(events.data)
      } catch (e) {
        res.status(404).json({})
      }
    }
  },
  update: {
    path: '/groups/:groupId/events',
    handler: async (req, res) => res.status(403)
  },
  delete: {
    path: '/groups/:groupId/events',
    handler: async (req, res) => res.status(403)
  }
}
