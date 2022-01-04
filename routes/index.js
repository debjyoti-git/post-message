const express = require("express");
const router = express.Router();
const scheduleJob = require("../collection/schedule_job");
const path = require("path");

router.get("/index", (req, res) => {
  var actualPath = path.join(__dirname, "../views/index.ejs");
  res.render(actualPath);
});
router.post("/postTime", scheduleJob.startJOB);
module.exports = router;
