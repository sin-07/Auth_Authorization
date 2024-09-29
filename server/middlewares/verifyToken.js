const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const headers = req.headers["authorization"];

  const token = headers.split(" ")[1];
  if (!token) {
    return res.status(404).json({
      message: "Access denied",
    });
  }
  jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }
    req.id = user.id;
  });
  next();
};

module.exports = verifyToken;
