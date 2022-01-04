const express = require("express");
const config = require("./config");
const { server } = config;
const { port, environment } = server;
const cron = require("node-schedule");
const { globalData } = require("./global");
const bodyParser = require("body-parser");
const eventEmitter = require("./emitter/processor");
const database = require("./utils/database/connectMongo");
const app = express();
const alternateColl = require("./collection/shiftdata");

database(); // Connecting database
var listner = function listner2() {
  console.log("==========================================");
  var format = new Date(JSON.parse(globalData.timestamp));
  console.log(format);
  var date = format.getDate();
  var month = format.getMonth() + 1;
  var year = format.getFullYear();
  var hour = format.getHours();
  var minute = format.getMinutes();
  var cronformat = "* " + minute + " " + hour + " " + date + " " + month + " *";
  console.log(cronformat);
  var my_job = cron.scheduledJobs["shiftData"];
  my_job ? my_job.cancel() : null;
  cron.scheduleJob("shiftData", cronformat, function () {
    alternateColl.shiftdata(globalData);
    console.log("I am executed at this time ", cronformat);
    console.log(date, month, year, hour, minute);

    cron.scheduledJobs["shiftData"].cancel();
  });
};
eventEmitter.on("connection", listner);

app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes")); //api routes
app.listen(port, console.log(`${environment} server started on port ${port}`));
console.log(environment);

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
