const { Schema, model } = require("mongoose");

const questionAnswerSchema = new Schema(
  {
    question: { type: String, trim: true },
    answer: { type: String, trim: true },
    created_date: { type: Date },
    updated_date: { type: Date },
    is_checked: { type: Boolean },
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("questionAnswer", questionAnswerSchema);
