const axios = require('axios')
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000'

module.exports = {
  create: {
    path: '/events',
    handler: async (req, res) => {
      const { title, description, date } = req.body
      const { headers } = req

      try {
        const event = await axios.post(`${apiBaseUrl}/events`, {
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
    path: '/events/:eventId',
    handler: async (req, res) => {
      const { eventId } = req.params
      const { headers } = req

      try {
        const event = await axios.get(`${apiBaseUrl}/events/${eventId}`, {
          headers
        })

        res.status(200).json(event.data)
      } catch (e) {
        res.status(404).json({})
      }
    }
  },
  update: {
    path: '/events/:eventId',
    handler: async (req, res) => res.status(403)
  },
  delete: {
    path: '/events/:eventId',
    handler: async (req, res) => res.status(403)
  }
}
