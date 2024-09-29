const User = require("../models/user");

exports.getUser = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId, '-password');

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        message: "User found",
        user,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
