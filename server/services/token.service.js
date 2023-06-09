const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("accessKey"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get("refreshKey"));
    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }

  async save(user, refreshToken) {
    const data = await Token.findOne({ user });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await Token.create({ user, refreshToken });
    return token;
  }

  async validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshKey"));
    } catch (error) {
      return null;
    }
  }

  async validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("accessKey"));
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
