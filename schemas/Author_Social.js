const { Schema, model } = require("mongoose");

const authorSocialSchema = new Schema({
  author_id: { type: Schema.Types.ObjectId, ref: "author" },
  social_id: { type: Schema.Types.ObjectId, ref: "social" },
  social_link: { type: String, required: true },
});

module.exports = model("author_social", authorSocialSchema);
