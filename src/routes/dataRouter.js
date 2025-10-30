const {
  movingReport,
  playbackReport,
} = require("../controller/dataController");

const dataRouter = require("express").Router();

dataRouter.post("/moving", movingReport);
dataRouter.post("/playback", playbackReport);

module.exports = dataRouter;
