const Joi = require("joi");

exports.descQAValidation = (body) => {
  const schema = Joi.object({
    qa_id: Joi.string().required(),
    desc_id: Joi.string().required(),
  });
  return schema.validate(body);
};