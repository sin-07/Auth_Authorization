const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie; 
  const token = cookies.split("=")[1]; 



  if (!token) {
    return res.status(404).json({
      message: "Access denied: No token found",
    });
  }


  jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    }
    console.log(user)
    req.id = user.id; 
  });
  next(); 
};

module.exports = verifyToken;
