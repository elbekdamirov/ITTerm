const Joi = require("joi");

exports.questionAnswerValidation = (body) => {
  const schema = Joi.object({
    question: Joi.string().required().min(1),
    answer: Joi.string().required().min(1),
    created_date: Joi.date(),
    updated_date: Joi.date(),
    is_checked: Joi.boolean().default(false),
    user_id: Joi.string().required(),
  });
  return schema.validate(body, { abortEarly: false });
};
