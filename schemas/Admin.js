const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    name: { type: String, trim: true },
    phone: { type: String, trim: true, unique: true },
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String },
    is_active: { type: Boolean },
    is_creator: { type: Boolean },
    created_date: { type: Date },
    updated_date: { type: Date },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("admin", adminSchema);
