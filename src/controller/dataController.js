const {
  movingReportData,
  playbackReportData,
  getDateTime,
} = require("../functions/movingData");
const { getCollection } = require("../models/dbModel");
const { snapToRoad } = require("../utils/osrmSnaps");

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

// --- API endpoint ---
const coordinateSnap = async (req, res) => {
  try {
    const { points } = req.body;
    if (!Array.isArray(points) || points.length === 0)
      return res.status(400).json({ error: "points array required" });

    console.log(`📍 Received ${points.length} GPS points`);
    const snapped = await snapToRoad(points, 100, 10);
    res.status(200).json({ success: true, data: snapped });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { movingReport, playbackReport, coordinateSnap };
