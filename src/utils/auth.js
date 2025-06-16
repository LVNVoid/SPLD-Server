const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET environment variable is not set");
}

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
