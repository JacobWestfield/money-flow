const TokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }

    const data = TokenService.validateAccessToken(token);

    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = data;

    next();
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
