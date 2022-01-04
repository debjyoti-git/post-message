const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReceiveJob = new Schema(
  {
    message: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("receivejobs", ReceiveJob, "receivejobs");
