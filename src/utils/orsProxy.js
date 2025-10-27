function decodePolyline(encoded) {
  let points = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
}

const OrsProxyServer = async (req, res) => {
  const { coordinates } = req.body; // should be [[lng, lat], [lng, lat], ...]

  if (!coordinates || !Array.isArray(coordinates)) {
    return res.status(400).json({ error: "Invalid coordinates format" });
  }

  try {
    const orsRes = await fetch(
      "https://api.openrouteservice.org/v2/snap/driving-car",
      {
        method: "POST",
        headers: {
          Accept:
            "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          Authorization:
            "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjU5YTM4MzAzYzRjMjQzMWJiZGE0MTY5MGY3ZjQ3NDVjIiwiaCI6Im11cm11cjY0In0=",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ locations: coordinates, radius: 5 }),
      }
    );
    const data = await orsRes.json();

    if (!data?.locations) {
      return res
        .status(404)
        .json({ success: false, message: "No matched route found" });
    }

    res.status(200).json({
      success: true,
      data: data?.locations,
    });
  } catch (err) {
    console.error("ORS Proxy Error:", err);
    res.status(500).json({ success: false, message: "ORS proxy failed" });
  }
};

/* request(
  {
    method: "POST",
    url: "https://api.openrouteservice.org/v2/snap/driving-car",
    body: `{"locations":${coordinates},"radius":350}`,
    headers: {
      Accept:
        "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
      Authorization:
        "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjU5YTM4MzAzYzRjMjQzMWJiZGE0MTY5MGY3ZjQ3NDVjIiwiaCI6Im11cm11cjY0In0=",
      "Content-Type": "application/json; charset=utf-8",
    },
  },
  function (error, response, body) {
    console.log("Status:", response.statusCode);
    console.log("Headers:", JSON.stringify(response.headers));
    console.log("Response:", body);
  }
); */

module.exports = OrsProxyServer;
