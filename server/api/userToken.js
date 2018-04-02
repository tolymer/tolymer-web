const axios = require('axios')
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000'

module.exports = {
  create: {
    path: '/user_token',
    handler: async (req, res) => {
      const { name, password } = req.body.auth

      try {
        const userToken = await axios.post(`${apiBaseUrl}/user_token`, {
          auth: {
            name,
            password
          }
        })

        res.cookie('accessToken', userToken.data.jwt, {
          httpOnly: false,
          maxAge: 1000 * 60 * 60 * 24,
          secure: false // true
        })
        res.status(200)
      } catch (e) {
        res.status(404)
      }

      res.json({})
    }
  },
  read: {
    path: '/user_token/*',
    handler: async (req, res) => res.status(403)
  },
  update: {
    path: '/user_token/*',
    handler: async (req, res) => res.status(403)
  },
  delete: {
    path: '/user_token/*',
    handler: async (req, res) => res.status(403)
  }
}
