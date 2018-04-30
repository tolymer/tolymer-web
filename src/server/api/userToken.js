const axios = require('../axios');

module.exports = {
  create: {
    path: '/user_token',
    handler: async (req, res) => {
      const { name, password } = req.body.auth;
      const auth = { name, password };

      const data = { auth };
      const userToken = await axios.post(`/user_token`, data);

      res.cookie('accessToken', userToken.data.jwt, {
        axiosOnly: false,
        maxAge: 1000 * 60 * 60 * 24,
        secure: false // true
      });
      res.status(200).json({});
    }
  }
};
