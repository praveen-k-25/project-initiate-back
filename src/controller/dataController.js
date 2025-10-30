const {
  movingReportData,
  playbackReportData,
} = require("../functions/movingData");
const { getCollection } = require("../models/dbModel");

const movingReport = async (req, res) => {
  const { startDate, endDate } = req.body;
  const rawData = await getCollection(process.env.DATA_COLLECTION)
    .find({
      timestamp: {
        $gte: new Date(startDate).getTime(),
        $lt: new Date(endDate).getTime(),
      },
    })
    .toArray();

  const resultData = movingReportData(rawData);
  res.status(200).json({
    success: true,
    data: resultData,
  });
};

const playbackReport = async (req, res) => {
  const { startDate, endDate } = req.body;
  const rawData = await getCollection(process.env.DATA_COLLECTION)
    .find({
      timestamp: {
        $gte: new Date(startDate).getTime(),
        $lt: new Date(endDate).getTime(),
      },
    })
    .toArray();

  const resultData = playbackReportData(rawData);
  res.status(200).json({
    success: true,
    data: resultData,
  });
};

module.exports = { movingReport, playbackReport };
