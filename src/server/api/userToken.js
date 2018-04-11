const axios = require("../axios");

module.exports = {
  create: {
    path: "/user_token",
    handler: async (req, res) => {
      const { name, password } = req.body.auth;

      try {
        const userToken = await axios.post(`/user_token`, {
          auth: {
            name,
            password
          }
        });

        res.cookie("accessToken", userToken.data.jwt, {
          axiosOnly: false,
          maxAge: 1000 * 60 * 60 * 24,
          secure: false // true
        });
        res.status(200).json({});
      } catch (e) {
        res.status(404).json({});
      }
    }
  },
  read: {
    path: "/user_token/*",
    handler: async (req, res) => res.status(403).json({})
  },
  update: {
    path: "/user_token/*",
    handler: async (req, res) => res.status(403).json({})
  },
  delete: {
    path: "/user_token/*",
    handler: async (req, res) => res.status(403).json({})
  }
};
