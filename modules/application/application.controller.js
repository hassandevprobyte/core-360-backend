const asyncHandler = require("express-async-handler");

// Services
const applicationService = require("./application.service");

// @desc    Get all applications
// @route   GET /api/v1/applications/all
// @access  Private
exports.getAllApplications = asyncHandler(async (req, res) => {
  const filters = req.filters;

  const data = await applicationService.getAllApplications(filters);

  res.status(200).json(data);
});

// @desc    Get applications with pagination
// @route   GET /api/v1/applications
// @access  Private
exports.getApplicationsWithPagination = asyncHandler(async (req, res) => {
  const payload = {
    filters: req.filters,
    page: req.pagination.page,
    pageSize: req.pagination.pageSize,
    sort: req.pagination.sort,
  };

  const data = await applicationService.getApplicationsWithPagination(payload);

  res.status(200).json(data);
});

// @desc    Get application by id
// @route   GET /api/v1/applications/:id
// @access  Private
exports.getApplicationById = asyncHandler(async (req, res) => {
  const data = await applicationService.getApplicationById(req.params.id);

  res.status(200).json(data);
});

// @desc    Create a new application
// @route   POST /api/v1/applications
// @access  Private
exports.createApplication = asyncHandler(async (req, res) => {
  const payload = {
    title: req.body.title,
    audience: req.body.audience,
    description: req.body.description,
    isActive: req.body.isActive,
  };

  const data = await applicationService.createApplication(payload);

  res.status(201).json(data);
});

// @desc    Update application
// @route   PATCH /api/v1/applications/:id
// @access  Private
exports.updateApplication = asyncHandler(async (req, res) => {
  const payload = {
    title: req.body.title,
    audience: req.body.audience,
    description: req.body.description,
    isActive: req.body.isActive,
  };

  const data = await applicationService.updateApplication(payload);

  res.status(200).json(data);
});

// @desc    Delete application
// @route   DELETE /api/v1/applications/:id
// @access  Private
exports.deleteApplication = asyncHandler(async (req, res) => {
  const data = await applicationService.deleteApplication(req.params.id);

  res.status(200).json(data);
});
