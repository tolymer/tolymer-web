const axios = require('axios')
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000'

module.exports = {
  create: {
    path: '/users',
    handler: async (req, res) => {
      const { name, password } = req.body

      try {
        const result = await axios.post(`${apiBaseUrl}/users`, {
          name,
          password
        })

        res.status(201)
      } catch (e) {
        res.status(404)
      }

      res.json({})
    }
  },
  read: {
    path: '/users/:userId',
    handler: async (req, res) => {
      const { userId } = req.params

      try {
        const result = await axios.get(`${apiBaseUrl}/users/${userId}`)

        res.status(200).json(result.data)
      } catch (e) {
        res.status(404).json({})
      }
    }
  },
  update: {
    path: '/users/*',
    handler: async (req, res) => res.status(403)
  },
  delete: {
    path: '/users/*',
    handler: async (req, res) => res.status(403)
  }
}
