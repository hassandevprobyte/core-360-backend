const crypto = require("crypto");

// Repositories
const applicationRepository = require("./application.repository");

// Validations
const joi = require("../../config");
const joiSchema = require("./application.schema");
const applicationValidation = require("./application.validation");

exports.getAllApplications = async (filters) => {
  return applicationRepository.getAllApplications(filters);
};

exports.getApplicationsWithPagination = async (payload) => {
  const { filters, page, pageSize, sort } = payload;
  const offset = (page - 1) * pageSize;

  const [applications, totalCount] = await Promise.all([
    applicationRepository.getApplicationsWithPagination(filters, offset, pageSize, sort),
    applicationRepository.getApplicationsCount(filters),
  ]);

  const meta = { totalCount, totalPages: Math.ceil(totalCount / pageSize), page, pageSize };

  return { data: applications, meta };
};

exports.getApplicationById = async (applicationId) => {
  joi.validate(applicationId, joiSchema.getApplicationById);

  return applicationValidation.throwErrorIfApplicationDoesNotExist(applicationId);
};

exports.createApplication = async (payload) => {
  const validatedPayload = joi.validate(payload, joiSchema.createApplication);

  await applicationValidation.throwErrorIfApplicationTitleExists(validatedPayload.title);
  await applicationValidation.throwErrorIfApplicationAudienceExists(validatedPayload.audience);

  validatedPayload.clientId = crypto.randomUUID();

  return applicationRepository.createApplication(validatedPayload);
};

exports.updateApplication = async (payload) => {
  const validatedPayload = joi.validate(payload, joiSchema.updateApplication);

  const existingApplication = await applicationValidation.throwErrorIfApplicationDoesNotExist(validatedPayload.id);
  const updatePayload = {};

  if (validatedPayload.title && validatedPayload.title !== existingApplication?.title) {
    await applicationValidation.throwErrorIfApplicationTitleExists(validatedPayload?.title);
    updatePayload.title = validatedPayload.title;
  }

  if (validatedPayload.audience && validatedPayload.audience !== existingApplication?.audience) {
    await applicationValidation.throwErrorIfApplicationAudienceExists(validatedPayload?.audience);
    updatePayload.audience = validatedPayload.audience;
  }

  if (validatedPayload.description && validatedPayload.description !== existingApplication?.description) {
    updatePayload.description = validatedPayload.description;
  }

  if (Object.hasOwn(validatedPayload, "isActive") && validatedPayload.isActive !== existingApplication?.isActive) {
    updatePayload.isActive = validatedPayload.isActive;
  }

  if (!Object.keys(updatePayload).length) return existingApplication;

  return applicationRepository.updateApplicationById(validatedPayload.id, updatePayload);
};

exports.deleteApplication = async (applicationId) => {
  joi.validate(applicationId, joiSchema.getApplicationById);

  await applicationValidation.throwErrorIfApplicationDoesNotExist(applicationId);

  await applicationRepository.deleteApplicationById(applicationId);
  return { deletedId: applicationId };
};
