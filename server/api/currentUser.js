const axios = require('axios')
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000'

module.exports = {
  create: {
    path: '/current_user',
    handler: async (req, res) => res.status(403).json({})
  },
  read: {
    path: '/current_user',
    handler: async (req, res) => {
      const { headers } = req

      try {
        const currentUser = await axios.get(`${apiBaseUrl}/current_user`, {
          headers
        })

        res.status(200).json(currentUser.data)
      } catch (e) {
        res.status(404).json({})
      }
    }
  },
  update: {
    path: '/current_user',
    handler: async (req, res) => res.status(403).json({})
  },
  delete: {
    path: '/current_user',
    handler: async (req, res) => res.status(403).json({})
  }
}
