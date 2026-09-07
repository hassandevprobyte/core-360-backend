const asyncHandler = require("express-async-handler");

// Services
const authService = require("../services/authService");

// Configs
const { env } = require("../config");

// @desc    Authenticate user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };

  const data = await authService.login(payload);

  res.cookie("accessToken", data.accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(200).json(data);
});

// @desc    Refresh auth token
// @route   GET /api/v1/auth/refresh
// @access  Public
exports.refresh = asyncHandler(async (req, res) => {
  const { accessToken } = await authService.refresh(req.cookies?.refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(200).json({ accessToken });
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Public
exports.logout = asyncHandler(async (req, res) => {
  if (!req.cookies?.refreshToken || !req.cookies?.accessToken) return res.sendStatus(204);

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Change user password
// @route   PATCH /api/v1/auth/changePassword
// @access  Private
exports.changePassword = asyncHandler(async (req, res) => {
  const payload = { id: req.user._id, oldPassword: req.body.oldPassword, newPassword: req.body.newPassword };
  const user = await authService.changePassword(payload);

  res.status(200).json(user);
});
