const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup controller
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const securePassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: securePassword,
    });

    await user.save();
    res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    // console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30s",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 30),
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(404).json({
      message: "Access denied: No token found",
    });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully",
    });
  });
};
