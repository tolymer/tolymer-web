const axios = require('axios')
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000'

module.exports = {
  create: {
    path: '/groups/:groupId/members',
    handler: async (req, res) => {
      const { groupId } = req.params
      const { headers } = req

      try {
        const group = await axios.post(`${apiBaseUrl}/groups/${groupId}/members`, {}, {
          headers
        })

        res.status(201).json(group.data)
      } catch (e) {
        res.status(404).json({})
      }
    }
  },
  read: {
    path: '/groups/:groupId/members',
    handler: async (req, res) => {
      const { groupId } = req.params
      const { headers } = req

      try {
        const group = await axios.get(`${apiBaseUrl}/groups/${groupId}/members`, {
          headers
        })

        res.status(200).json(group.data)
      } catch (e) {
        res.status(404).json({})
      }
    }
  },
  update: {
    path: '/groups/:groupId/members',
    handler: async (req, res) => res.status(403).json({})
  },
  delete: {
    path: '/groups/:groupId/members',
    handler: async (req, res) => res.status(403).json({})
  }
}
