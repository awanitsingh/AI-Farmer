import React, { useState } from "react";
import { saveHistory } from "./utils/saveHistory";
import { predictFertilizer } from "./utils/fertilizerPredictor";

const soilTypes = ["Loamy", "Sandy", "Clayey", "Black", "Red"];
const cropTypes = ["Sugarcane", "Cotton", "Millets", "Paddy", "Pulses", "Wheat", "Tobacco", "Barley", "Oil seeds", "Ground Nuts", "Maize"];

const numFields = [
  { name: "Temparature", label: "Temperature (°C)", placeholder: "e.g. 26", step: "0.1", icon: "🌡️" },
  { name: "Humidity", label: "Humidity (%)", placeholder: "e.g. 52", step: "1", icon: "💧" },
  { name: "Moisture", label: "Moisture", placeholder: "e.g. 38", step: "1", icon: "🌊" },
  { name: "Nitrogen", label: "Nitrogen (N)", placeholder: "e.g. 37", step: "1", icon: "🧪" },
  { name: "Potassium", label: "Potassium (K)", placeholder: "e.g. 0", step: "1", icon: "⚗️" },
  { name: "Phosphorous", label: "Phosphorous (P)", placeholder: "e.g. 0", step: "1", icon: "🧫" },
];

function FertForm({ onSubmit, darkMode }) {
  const [formValues, setFormValues] = useState({
    Temparature: null, Humidity: null, Moisture: null,
    Nitrogen: null, Potassium: null, Phosphorous: null,
    Soil_Type: "Loamy", Crop_Type: "Sugarcane",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formValues);
    setLoading(false);
  };

  const selectClass = `eco-input appearance-none cursor-pointer`;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {numFields.map((f) => (
          <div key={f.name}>
            <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-green-300" : "text-green-800"}`}>
              {f.icon} {f.label}
            </label>
            <input
              type="number"
              name={f.name}
              placeholder={f.placeholder}
              step={f.step}
              required
              onChange={handleChange}
              className="eco-input"
            />
          </div>
        ))}

        <div>
          <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-green-300" : "text-green-800"}`}>
            🌍 Soil Type
          </label>
          <select name="Soil_Type" required onChange={handleChange} className={selectClass}>
            {soilTypes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-green-300" : "text-green-800"}`}>
            🌾 Crop Type
          </label>
          <select name="Crop_Type" required onChange={handleChange} className={selectClass}>
            {cropTypes.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="text-center">
        <button type="submit" className="btn-eco px-10 py-3 text-base" disabled={loading}>
          {loading ? "🌱 Analyzing..." : "💧 Get Fertilizer Recommendation"}
        </button>
      </div>
    </form>
  );
}

function FertResult({ result, onBack, darkMode }) {
  const fertName = result?.split(" is")[0] || "fertilizer";

  const fertImages = {
    "urea":      "https://images.pexels.com/photos/5029859/pexels-photo-5029859.jpeg?w=400",
    "dap":       "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=400",
    "mop":       "https://images.pexels.com/photos/1382102/pexels-photo-1382102.jpeg?w=400",
    "npk":       "https://images.pexels.com/photos/1382102/pexels-photo-1382102.jpeg?w=400",
    "ssp":       "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=400",
    "compost":   "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?w=400",
    "potassium": "https://images.pexels.com/photos/1382102/pexels-photo-1382102.jpeg?w=400",
    "gypsum":    "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=400",
  };

  const key = Object.keys(fertImages).find(k => fertName.toLowerCase().includes(k)) || "npk";
  const img = fertImages[key] || fertImages["npk"];

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="md:w-1/2">
        <img
          src={img}
          alt={fertName}
          className="rounded-2xl w-full object-cover shadow-lg bg-green-50"
          style={{ maxHeight: "340px", minHeight: "200px" }}
        />
      </div>
      <div className="md:w-1/2 text-center">
        <div className="text-6xl mb-4">💊</div>
        <p className={`text-sm font-medium mb-2 ${darkMode ? "text-green-400" : "text-green-600"}`}>Recommended Fertilizer</p>
        <h3 className={`text-4xl font-bold mb-4 capitalize ${darkMode ? "text-green-300" : "text-green-800"}`}>{result}</h3>
        <p className={`text-sm leading-relaxed mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          This recommendation is based on your soil and crop data. Always consult a local agronomist before application.
        </p>
        <button onClick={onBack} className="btn-outline-eco">← Try Again</button>
      </div>
    </div>
  );
}

function Fertilizer({ darkMode, user }) {
  const [result, setResult] = useState(null);

  const handleSubmit = async (formValues) => {
    try {
      // Instant local prediction
      const localResult = predictFertilizer(formValues);
      setResult(localResult);
      if (user) await saveHistory(user.uid, "fertilizer", formValues, localResult);

      // Try API in background
      fetch("https://karthikfertapi.onrender.com/predict", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      }).then((res) => res.json()).then((data) => {
        if (data.result) setResult(data.result);
      }).catch(() => {});
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
          darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
        }`}>
          💧 AI Model 2
        </div>
        <h2 className="section-title mb-3">Fertilizer Recommendation</h2>
        <p className={`max-w-xl mx-auto text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Provide soil nutrients, moisture, and crop details to get the optimal fertilizer for your farm.
        </p>
      </div>

      <div className={`eco-card p-8 ${darkMode ? "bg-gray-800/60" : ""}`}>
        {result
          ? <FertResult result={result} onBack={() => setResult(null)} darkMode={darkMode} />
          : <FertForm onSubmit={handleSubmit} darkMode={darkMode} />
        }
      </div>
    </div>
  );
}

export default Fertilizer;
