const {
  movingReport,
  playbackReport,
  coordinateSnap,
} = require("../controller/dataController");
const OrsProxyServer = require("../utils/orsProxy");

const dataRouter = require("express").Router();

dataRouter.post("/match", OrsProxyServer);
dataRouter.post("/snap", coordinateSnap);
dataRouter.post("/moving", movingReport);
dataRouter.post("/playback", playbackReport);

module.exports = dataRouter;
