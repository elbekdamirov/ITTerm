const { sendErrorResponse } = require("../helpers/send_error_response");
const Social = require("../schemas/Social");

const create = async (req, res) => {
  try {
    const newSocial = await Social.create(req.body);

    res.status(201).send({ message: "New social added", newSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Social.find({});
    res.status(200).send({ data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const categ = await Social.findById(id);

    res.status(200).send({ categ });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Social.findByIdAndDelete(id);

    res.status(200).send({ message: "Social deleted", deletedItem });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updatedItem = await Social.findByIdAndUpdate(req.params, req.body);

    res.status(200).send({ message: "Social updated", updatedItem });
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
