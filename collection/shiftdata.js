const ObjectId = require("mongoose").Types.ObjectId;
const { globalData, triggerChange } = require("../global");
const ScheduleJob = require("../models/ScheduleJob");
const ReceiveJob = require("../models/ReceiveJob");

exports.shiftdata = async (data) => {
  console.log("I am Data", data);
  const del = await ScheduleJob.findByIdAndDelete(data._id);
  delete data._id;
  const insert = new ReceiveJob(data);
  const doc = await insert.save();
  console.log(doc);
};
