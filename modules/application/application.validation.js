const Boom = require("@hapi/boom");

// Repositories
const applicationRepository = require("./application.repository");

// Constants
const message = require("../../constants/MESSAGE");

exports.throwErrorIfApplicationDoesNotExist = async (applicationId) => {
  const application = await applicationRepository.getApplicationById(applicationId);

  if (!application) {
    throw Boom.notFound(message.error.application.notFound);
  }

  return application;
};

exports.throwErrorIfApplicationTitleExists = async (title) => {
  const application = await applicationRepository.getApplicationByTitle(title);

  if (application) {
    throw Boom.conflict(message.error.application.titleExists);
  }

  return true;
};

exports.throwErrorIfApplicationAudienceExists = async (audience) => {
  const application = await applicationRepository.getApplicationByAudience(audience);

  if (application) {
    throw Boom.conflict(message.error.application.audienceExists);
  }

  return true;
};

exports.throwErrorIfApplicationClientIdExists = async (clientId) => {
  const application = await applicationRepository.getApplicationByClientId(clientId);

  if (application) {
    throw Boom.conflict(message.error.application.clintIdExists);
  }

  return true;
};

exports.throwErrorIfApplicationClientIdDoesNotExist = async (clientId) => {
  const application = await applicationRepository.getApplicationByClientId(clientId);

  if (!application) {
    throw Boom.notFound(message.error.application.notFound);
  }

  return application;
};
