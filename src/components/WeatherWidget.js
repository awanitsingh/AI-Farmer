import { useState, useEffect } from "react";

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export default function WeatherWidget({ darkMode, onWeatherLoad }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `${WEATHER_API}?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`
          );
          const data = await res.json();
          const w = {
            temp: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            rainfall: data.current.precipitation,
            wind: data.current.wind_speed_10m,
            code: data.current.weather_code,
          };
          setWeather(w);
          if (onWeatherLoad) onWeatherLoad(w);
        } catch {
          setError("Failed to fetch weather.");
        } finally {
          setLoading(false);
        }
      },
      () => { setError("Location access denied."); setLoading(false); }
    );
  }, [onWeatherLoad]);

  const getIcon = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    return "🌩️";
  };

  const card = darkMode ? "bg-gray-800/60 border-green-900" : "bg-white border-green-100";

  if (loading) return (
    <div className={`eco-card p-4 ${card} flex items-center gap-3`}>
      <span className="text-2xl animate-spin">🌿</span>
      <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Fetching weather...</span>
    </div>
  );

  if (error) return (
    <div className={`eco-card p-4 ${card}`}>
      <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>⚠️ {error}</p>
    </div>
  );

  return (
    <div className={`eco-card p-5 ${card}`}>
      <div className={`text-xs font-semibold mb-3 ${darkMode ? "text-green-400" : "text-green-700"}`}>
        📍 Current Weather
      </div>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{getIcon(weather.code)}</span>
        <div>
          <div className={`text-3xl font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}>
            {weather.temp}°C
          </div>
          <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Wind {weather.wind} km/h
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: "💧", label: "Humidity", value: `${weather.humidity}%` },
          { icon: "🌧️", label: "Rainfall", value: `${weather.rainfall}mm` },
          { icon: "🌡️", label: "Temp", value: `${weather.temp}°C` },
        ].map((s, i) => (
          <div key={i} className={`text-center p-2 rounded-xl ${darkMode ? "bg-gray-700/50" : "bg-green-50"}`}>
            <div className="text-lg">{s.icon}</div>
            <div className={`text-xs font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}>{s.value}</div>
            <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
