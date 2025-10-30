// --- helper to split large arrays into smaller chunks ---
function batchArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// --- OSRM Snap Function ---
async function snapToRoad(coordsArray, batchSize = 100, radius = 10) {
  const batches = batchArray(coordsArray, batchSize);
  const snappedAll = [];

  for (const batch of batches) {
    const coords = batch.map((p) => `${p[1]},${p[0]}`).join(";");
    const radiuses = batch.map(() => radius).join(";");
    const url = `https://router.project-osrm.org/match/v1/driving/${coords}?geometries=geojson&radiuses=${radiuses}`;
    console.log(url)
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.matchings && data.matchings.length > 0) {
        for (const m of data.matchings) {
          if (m.geometry?.coordinates) {
            const snapped = m.geometry.coordinates.map(([lng, lat]) => ({
              lat,
              lng,
            }));
            snappedAll.push(...snapped);
          }
        }
      } else if (data.tracepoints) {
        const traceSnapped = data.tracepoints
          .filter((tp) => tp && tp.location)
          .map((tp) => ({ lat: tp.location[1], lng: tp.location[0] }));
        snappedAll.push(...traceSnapped);
      }

      await new Promise((res) => setTimeout(res, 150)); // avoid OSRM rate limit
    } catch (err) {
      console.error("❌ Error snapping batch:", err.message);
    }
  }

  return snappedAll;
}

module.exports = { snapToRoad, batchArray };
