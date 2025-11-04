const { ObjectId } = require("mongodb");
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

const dashboardVehicles = async (req, res) => {
  const { user } = req.body;

  const vehicleList = await getCollection(process.env.USER_COLLECTION).findOne({
    _id: new ObjectId(user),
  });

  let result = [];
  for (let vehicle of vehicleList.vehicles) {
    let data = await getCollection(process.env.DATA_COLLECTION).findOne(
      {
        user: vehicle.toString(),
      },
      { sort: { timestamp: -1 } }
    );
    data && result.push(data);
  }

  res.status(200).json({
    success: true,
    data: result,
  });
};

module.exports = { movingReport, playbackReport, dashboardVehicles };
