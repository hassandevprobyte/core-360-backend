const asyncHandler = require("express-async-handler");

// Services
const userService = require("../user/user.service");

// @desc    Get all users
// @route   GET /public/users
// @access  Public
exports.getAllUsers = asyncHandler(async (req, res) => {
  const data = await userService.getAllUsers(req.query.query);

  res.status(200).json(data);
});
