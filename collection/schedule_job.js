const ObjectId = require("mongoose").Types.ObjectId;
const { globalData, triggerChange } = require("../global");
const ScheduleJob = require("../models/ScheduleJob");

exports.startJOB = async (req, res) => {
  const body = req.body;
  const filter = globalData;
  // console.log("filter", filter);

  try {
    console.log("i am here ", filter);
    if (filter._id) {
      const updated = await ScheduleJob.findOneAndUpdate(
        { _id: ObjectId(filter._id) },
        { $set: req.body },
        { upsert: true, new: true }
      );

      triggerChange(updated._id.toString(), updated.time, filter.message);
      res.status(200).json("Inserted");
    } else {
      const Doc = new ScheduleJob(body);
      const doc = await Doc.save();
      triggerChange(doc._id.toString(), doc.time, doc.message);
      res.status(200).json("Inserted");
    }
    // console.log(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  //res.status(200).json("it is done");
};
