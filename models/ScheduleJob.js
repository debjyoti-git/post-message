const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleJob = new Schema(
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

module.exports = mongoose.model("schedulejobs", ScheduleJob, "schedulejobs");
