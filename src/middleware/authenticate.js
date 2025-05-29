const { verifyToken } = require("../utils/auth");

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token not found" });
    }

    const user = verifyToken(token);

    if (!user) {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid or expired token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Token error" });
  }
};

module.exports = authenticate;
