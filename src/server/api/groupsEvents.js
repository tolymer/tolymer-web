const axios = require('../axios');

module.exports = {
  create: {
    path: '/groups/:groupId/events',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const { title, description, date } = req.body;
      const { headers } = req;
      const event = await axios.post(
        `/groups/${groupId}/events`,
        {
          title,
          description,
          date
        },
        {
          headers
        }
      );

      res.status(201).json(event.data);
    }
  },
  read: {
    path: '/groups/:groupId/events',
    handler: async (req, res) => {
      const { groupId } = req.params;
      const { headers } = req;
      const events = await axios.get(`/groups/${groupId}/events`, {
        headers
      });

      res.status(200).json(events.data);
    }
  }
};
