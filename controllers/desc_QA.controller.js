const { sendErrorResponse } = require("../helpers/send_error_response");
const Desc_QA = require("../schemas/Desc_QA");
const descQAValidation = require("../validation/desc_QA.validation");

const create = async (req, res) => {
  try {
    const { error, value } = descQAValidation(req.body);

    if (error) {
      sendErrorResponse(error, res);
    }

    const newDescTopic = await Desc_QA.create(value);
    res.status(201).send({ message: "New Desc_QA added", newDescTopic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  let { limit, offset } = req.query;
  try {
    limit = limit ? limit : 10;
    offset = offset ? offset : 1;

    const data = await Desc_QA.find({})
      .populate("qa_id")
      .populate("desc_id")
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
    const Desc_QA = await Desc_QA.findById(id)
      .populate("qa_id")
      .populate("desc_id");

    res.status(200).send({ Desc_QA });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Desc_QA.findByIdAndDelete(id);

    res.status(200).send({ message: "Desc_QA deleted", deletedItem });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = descQAValidation(req.body);

    if (error) {
      sendErrorResponse(error, res);
    }

    const updatedItem = await Desc_QA.findByIdAndUpdate(id, value);

    res.status(200).send({ message: "Desc_QA updated", updatedItem });
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
