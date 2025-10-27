const {
  movingReport,
  playbackReport,
} = require("../controller/dataController");
const OrsProxyServer = require("../utils/orsProxy");

const dataRouter = require("express").Router();

dataRouter.post("/match", OrsProxyServer);
dataRouter.post("/moving", movingReport);
dataRouter.post("/playback", playbackReport);

module.exports = dataRouter;
