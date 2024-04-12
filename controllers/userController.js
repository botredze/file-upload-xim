const UserService = require('../service/userService')


class UserController {

    async login(req, res) {
        const { email, password } = req.body;
        try {
          const result = await UserService.login(email, password);
          if (!result.success) {
            return res.status(401).json({ message: result.message });
          }
          return res.status(200).json({ accessToken: result.accessToken, refreshToken: result.refreshToken });
        } catch (error) {
          return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async refreshAccessToken (req, res) {
        const { userId, refreshToken } = req.body;
        try {
          const accessToken = await UserService.refreshToken(userId, refreshToken);
        
          if (!accessToken) {
            return res.status(401).json({ message: 'Invalid refresh token' });
          }
          return res.status(200).json({ accessToken });
        } catch (error) {
          return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async register(req, res) {
      const { email, password } = req.body;
      try {
          const user = await UserService.register(email, password);
          if (!user.success) {
              return res.status(401).json({ message: user.message });
          } else {
              return res.status(200).json({ userId: user.userId });
          }
      } catch (error) {
          return res.status(500).json({ message: 'Internal server error' });
      }
    }

    async getUserInfo(req, res) {
      try {
          const userId = req.user.userId;
          res.status(200).json({ userId });
      } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
      }
  }

  async logout(req, res) {
    try {
        const userId = req.user.userId;
        await UserService.blockTokens(userId);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
  
}

module.exports = new UserController()