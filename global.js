const eventEmitter = require("./emitter/processor");
const globalData = {
  _id: "",
  timestamp: "",
  message: "",
};
function triggerChange(_id, timestamp, message) {
  globalData._id = _id;
  globalData.timestamp = timestamp;
  globalData.message = message;
  eventEmitter.emit("connection");
}
module.exports = {
  globalData,
  triggerChange,
};
