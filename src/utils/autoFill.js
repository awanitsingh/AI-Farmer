/**
 * Auto-fill farm parameters from user's location
 * - Temperature, Humidity, Rainfall from Open-Meteo (real)
 * - N, P, K, pH estimated from soil zone based on coordinates
 */

// Rough soil zone estimation based on lat/lon (India-focused)
function estimateSoilValues(lat, lon) {
  // India soil zones (simplified)
  // Northwest (Punjab, Haryana) — alluvial, high N
  if (lat > 28 && lon < 77) return { N: 85, P: 45, K: 50, ph: 7.2, moisture: 55 };
  // Northeast (Assam, Bengal) — acidic, low pH
  if (lat > 24 && lon > 88) return { N: 70, P: 35, K: 40, ph: 5.8, moisture: 70 };
  // Deccan Plateau (Maharashtra, Karnataka) — black cotton soil
  if (lat < 20 && lon > 74 && lon < 80) return { N: 60, P: 30, K: 55, ph: 7.8, moisture: 40 };
  // South (Tamil Nadu, Kerala) — red laterite
  if (lat < 15) return { N: 55, P: 25, K: 35, ph: 6.2, moisture: 60 };
  // Central India (MP, Chhattisgarh)
  if (lat > 20 && lat < 26 && lon > 77 && lon < 84) return { N: 65, P: 38, K: 45, ph: 6.8, moisture: 50 };
  // UP, Bihar — alluvial plains
  if (lat > 24 && lat < 28 && lon > 77 && lon < 88) return { N: 80, P: 42, K: 48, ph: 7.0, moisture: 58 };
  // Rajasthan — arid, sandy
  if (lon < 75 && lat > 24) return { N: 40, P: 20, K: 30, ph: 8.2, moisture: 25 };
  // Default
  return { N: 70, P: 35, K: 40, ph: 6.8, moisture: 50 };
}

export async function autoFillFromLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          // Fetch weather
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,precipitation&timezone=auto`
          );
          const data = await res.json();
          const c = data.current;

          // Estimate soil values from location
          const soil = estimateSoilValues(latitude, longitude);

          // Get city name
          let city = "";
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              { headers: { "User-Agent": "AIFarmer/1.0 (awanitsingh8873@gmail.com)" } }
            );
            const geoData = await geoRes.json();
            city = geoData.address?.city || geoData.address?.town ||
              geoData.address?.village || geoData.address?.county || "";
          } catch { /* ignore */ }

          resolve({
            temperature: c.temperature_2m?.toFixed(1) || 25,
            humidity:    c.relative_humidity_2m || 60,
            rainfall:    c.precipitation || 0,
            city,
            ...soil,
          });
        } catch (e) {
          reject(e);
        }
      },
      (err) => reject(err),
      { timeout: 8000 }
    );
  });
}
