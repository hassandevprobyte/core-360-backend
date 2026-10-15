const Joi = require("joi");
const { objectId } = require("../../config");

exports.baseSchema = Joi.object({
  title: Joi.string().lowercase().trim().min(3).max(255),
  clientId: Joi.string().trim(),
  audience: Joi.string().uri().trim(),
  description: Joi.string().lowercase().trim(),
  isActive: Joi.boolean(),
});

exports.createApplication = exports.baseSchema.fork(["title", "audience"], (schema) => schema.required()).fork("isActive", (schema) => schema.default(true));

exports.updateApplication = exports.baseSchema.append({ id: objectId.required() });

exports.getApplicationById = objectId.required();
