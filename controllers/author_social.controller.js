const { sendErrorResponse } = require("../helpers/send_error_response");
const Author_Social = require("../schemas/Author_Social");
const {
  authorSocialValidation,
} = require("../validation/author_social.validation");

const create = async (req, res) => {
  try {
    const { error, value } = authorSocialValidation(req.body);

    if (error) {
      sendErrorResponse(error, res);
    }

    const authorSocial = await Author_Social.create(value);
    res.status(201).send({ message: "New AuthorSocial added", authorSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  let { limit, offset } = req.query;
  try {
    limit = limit ? limit : 10;
    offset = offset ? offset : 1;

    const data = await Author_Social.find({})
      .populate("author_id")
      .populate("social_id")
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
    const authorSocial = await Author_Social.findById(id)
      .populate("author_id")
      .populate("social_id");

    res.status(200).send({ authorSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Author_Social.findByIdAndDelete(id);

    res.status(200).send({ message: "AuthorSocial deleted", deletedItem });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = authorSocialValidation(req.body);

    if (error) {
      sendErrorResponse(error, res);
    }

    const updatedItem = await Author_Social.findByIdAndUpdate(id, value);

    res.status(200).send({ message: "AuthorSocial updated", updatedItem });
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
