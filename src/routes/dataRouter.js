const { movingReport } = require("../controller/dataController");

const dataRouter = require("express").Router();

dataRouter.post("/moving", movingReport);

module.exports = dataRouter;
