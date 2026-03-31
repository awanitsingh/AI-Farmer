import { useState, useEffect, useRef } from "react";

const getWeatherIcon = (code) => {
  if (code === 0) return { icon: "☀️", label: "Clear Sky" };
  if (code <= 2) return { icon: "🌤️", label: "Partly Cloudy" };
  if (code <= 3) return { icon: "☁️", label: "Overcast" };
  if (code <= 49) return { icon: "🌫️", label: "Foggy" };
  if (code <= 67) return { icon: "🌧️", label: "Rainy" };
  if (code <= 77) return { icon: "❄️", label: "Snowy" };
  if (code <= 82) return { icon: "🌦️", label: "Showers" };
  return { icon: "⛈️", label: "Thunderstorm" };
};

export default function WeatherWidget({ darkMode, onWeatherLoad }) {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          // Fetch weather from Open-Meteo (free, no API key)
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure&timezone=auto&wind_speed_unit=kmh`
          );
          const weatherData = await weatherRes.json();
          const c = weatherData.current;

          // Reverse geocode for city name (free)
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const geoData = await geoRes.json();
          const cityName =
            geoData.address?.city ||
            geoData.address?.town ||
            geoData.address?.village ||
            geoData.address?.county ||
            "Your Location";

          const w = {
            temp: Math.round(c.temperature_2m),
            feelsLike: Math.round(c.apparent_temperature),
            humidity: c.relative_humidity_2m,
            rainfall: c.precipitation,
            wind: Math.round(c.wind_speed_10m),
            pressure: c.surface_pressure,
            code: c.weather_code,
          };

          setWeather(w);
          setCity(cityName);
          if (onWeatherLoad) onWeatherLoad(w);
        } catch (e) {
          console.error(e);
          setError("Failed to fetch weather data.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Location access denied. Please allow location.");
        setLoading(false);
      },
      { timeout: 10000 }
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const card = darkMode ? "bg-gray-800/60 border-green-900" : "bg-white border-green-100";

  if (loading) return (
    <div className={`eco-card p-5 ${card}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl animate-pulse">🌿</span>
        <div>
          <div className={`text-sm font-medium ${darkMode ? "text-green-300" : "text-green-700"}`}>Fetching weather...</div>
          <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Detecting your location</div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className={`eco-card p-5 ${card}`}>
      <div className="text-center">
        <div className="text-3xl mb-2">📍</div>
        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{error}</p>
      </div>
    </div>
  );

  const { icon, label } = getWeatherIcon(weather.code);

  return (
    <div className={`eco-card p-5 ${card}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`text-xs font-semibold ${darkMode ? "text-green-400" : "text-green-700"}`}>
          📍 {city}
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"}`}>
          Live
        </span>
      </div>

      {/* Main temp */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-5xl">{icon}</span>
        <div>
          <div className={`text-4xl font-bold ${darkMode ? "text-green-200" : "text-gray-800"}`}>
            {weather.temp}°C
          </div>
          <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {label} · Feels like {weather.feelsLike}°C
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: "💧", label: "Humidity", value: `${weather.humidity}%` },
          { icon: "🌧️", label: "Rainfall", value: `${weather.rainfall} mm` },
          { icon: "💨", label: "Wind", value: `${weather.wind} km/h` },
          { icon: "🔵", label: "Pressure", value: `${Math.round(weather.pressure)} hPa` },
        ].map((s, i) => (
          <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-green-50"}`}>
            <span className="text-base">{s.icon}</span>
            <div>
              <div className={`text-xs font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}>{s.value}</div>
              <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
