const Application = require("./application.model");

exports.getAllApplications = async (filters) => {
  return Application.find(filters).sort({ title: 1 }).lean();
};

exports.getApplicationsWithPagination = async (filters, offset, pageSize, sort) => {
  return Application.find(filters).skip(offset).limit(pageSize).sort(sort).lean();
};

exports.getApplicationsCount = async (filters) => {
  return Application.countDocuments(filters);
};

exports.getApplicationById = async (applicationId) => {
  return Application.findById(applicationId);
};

exports.getApplicationByTitle = async (title) => {
  return Application.findOne({ title }).lean();
};

exports.getApplicationByAudience = async (audience) => {
  return Application.findOne({ audience }).lean();
};

exports.getApplicationByClientId = async (clientId) => {
  return Application.findOne({ clientId }).lean();
};

exports.createApplication = async (payload) => {
  return Application.create(payload);
};

exports.updateApplicationById = async (applicationId, payload) => {
  return Application.findByIdAndUpdate(applicationId, payload, { returnDocument: "after" });
};

exports.deleteApplicationById = async (applicationId) => {
  return Application.findByIdAndDelete(applicationId);
};
