const { verifyToken } = require("../utils/auth");

const authenticate = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token not found" });
  }

  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  req.user = user;
  next();
};

module.exports = authenticate;
