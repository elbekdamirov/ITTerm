const { sendErrorResponse } = require("../helpers/send_error_response");
const Author = require("../schemas/Author");
const Joi = require("joi");
const { authorValidation } = require("../validation/author.validation.js");

const create = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);

    if (error) {
      sendErrorResponse(error, res);
    }

    const newAuthor = await Author.create(value);
    res.status(201).send({ message: "New Author added", newAuthor });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  let { limit, offset } = req.query;
  try {
    limit = limit ? limit : 10;
    offset = offset ? offset : 1;

    const data = await Dict.find({})
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
    const dict = await Dict.findById(id);

    res.status(200).send({ dict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Dict.findByIdAndDelete(id);

    res.status(200).send({ message: "Term deleted", deletedItem });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { term } = req.body;
    const updatedItem = await Dict.findByIdAndUpdate(id, {
      term,
      letter: term[0],
    });

    res.status(200).send({ message: "Term updated", updatedItem });
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
