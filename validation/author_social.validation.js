const Joi = require("joi");

exports.authorSocialValidation = (body) => {
  const schema = Joi.object({
    author_id: Joi.string().required(),
    social_id: Joi.string().required(),
    social_link: Joi.string().required().min(3),
  });
  return schema.validate(body);
};
