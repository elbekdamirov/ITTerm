const { Schema, model } = require("mongoose");

const descQASchema = new Schema({
  qa_id: { type: Schema.Types.ObjectId, ref: "topic" },
  desc_id: { type: Schema.Types.ObjectId, ref: "desc" },
});

module.exports = model("desc_QA", descQASchema);
