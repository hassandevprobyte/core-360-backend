const Joi = require("joi");
const { objectId } = require("../index");

exports.getCompanyById = objectId.required();

exports.baseSchema = Joi.object({
  title: Joi.string().lowercase().trim().min(2).max(255),
  acronym: Joi.string().uppercase().trim().min(2).max(10),
  imgUrl: Joi.string(),
});

exports.createCompany = exports.baseSchema.fork(["title", "acronym"], (schema) => schema.required());

exports.updateCompany = exports.baseSchema.append({ id: objectId.required() });
