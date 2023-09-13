const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique : true
    },
    createdBy: {
      type: String,
      required: true,
      default: "1",
    },
    createdDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserType", userTypeSchema);
