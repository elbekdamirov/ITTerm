const { sendErrorResponse } = require("../helpers/send_error_response");
const Question_Answer = require("../schemas/Question_Answer");
const {
  questionAnswerValidation,
} = require("../validation/question_answer.validation");

const create = async (req, res) => {
  try {
    const { error, value } = questionAnswerValidation(req.body);

    if (error) {
      sendErrorResponse(error, res);
    }

    const data = await Question_Answer.create(value);
    res.status(201).send({ message: "New QuestionAnswer added", data });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  let { limit, offset } = req.query;
  try {
    limit = limit ? limit : 10;
    offset = offset ? offset : 1;

    const data = await Question_Answer.find({})
      .populate("user_id")
      .limit(limit)
      .skip((offset - 1) * limit);

    res.status(200).send({ data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Question_Answer.findById(id).populate("author_id");

    res.status(200).send({ data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Question_Answer.findByIdAndDelete(id);

    res.status(200).send({ message: "Question deleted", deletedItem });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = questionAnswerValidation(req.body);

    if (error) {
      sendErrorResponse(error, res);
    }

    const updatedItem = await Question_Answer.findByIdAndUpdate(id, value);

    res.status(200).send({ message: "Question updated", updatedItem });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  remove,
  update,
};
