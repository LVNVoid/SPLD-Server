const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};
