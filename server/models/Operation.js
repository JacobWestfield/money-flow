const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    commentary: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    bill: {
      type: Schema.Types.ObjectId,
      ref: "Bill",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "date" },
  }
);

module.exports = model("Operation", schema);
