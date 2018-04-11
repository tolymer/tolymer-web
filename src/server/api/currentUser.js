const axios = require("../axios");

module.exports = {
  create: {
    path: "/current_user",
    handler: async (req, res) => res.status(403).json({})
  },
  read: {
    path: "/current_user",
    handler: async (req, res) => {
      const { headers } = req;

      try {
        const currentUser = await axios.get("/current_user", {
          headers
        });

        res.status(200).json(currentUser.data);
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  update: {
    path: "/current_user",
    handler: async (req, res) => res.status(403).json({})
  },
  delete: {
    path: "/current_user",
    handler: async (req, res) => res.status(403).json({})
  }
};
