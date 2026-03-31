import React, { useState } from "react";
import { saveHistory } from "./utils/saveHistory";
import { predictCrop } from "./utils/cropPredictor";

const inputFields = [
  { name: "Nitrogen", label: "Nitrogen (N)", placeholder: "e.g. 90", step: "1", icon: "🧪" },
  { name: "Phosporus", label: "Phosphorus (P)", placeholder: "e.g. 42", step: "1", icon: "🧫" },
  { name: "Potassium", label: "Potassium (K)", placeholder: "e.g. 43", step: "1", icon: "⚗️" },
  { name: "Temperature", label: "Temperature (°C)", placeholder: "e.g. 25.5", step: "0.01", icon: "🌡️" },
  { name: "Humidity", label: "Humidity (%)", placeholder: "e.g. 80", step: "0.01", icon: "💧" },
  { name: "Ph", label: "pH Value", placeholder: "e.g. 6.5", step: "0.01", icon: "🔬" },
  { name: "Rainfall", label: "Rainfall (mm)", placeholder: "e.g. 200", step: "0.01", icon: "🌧️" },
];

function CropForm({ onSubmit, darkMode }) {
  const [formValues, setFormValues] = useState({
    N: null, P: null, K: null,
    temperature: null, humidity: null, ph: null, rainfall: null,
  });
  const [loading, setLoading] = useState(false);

  const keyMap = {
    Nitrogen: "N", Phosporus: "P", Potassium: "K",
    Temperature: "temperature", Humidity: "humidity", Ph: "ph", Rainfall: "rainfall",
  };

  const handleChange = (e) => {
    const key = keyMap[e.target.name];
    setFormValues({ ...formValues, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formValues);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {inputFields.map((f) => (
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
      </div>
      <div className="text-center">
        <button type="submit" className="btn-eco px-10 py-3 text-base" disabled={loading}>
          {loading ? "🌱 Predicting..." : "🌾 Get Crop Recommendation"}
        </button>
      </div>
    </form>
  );
}

function CropResult({ result, onBack, darkMode }) {
  // Extract crop name from result string e.g. "Rice is the best crop..."
  const cropName = result?.split(" ")[0]?.toLowerCase() || "farm";
  const imageUrl = `https://source.unsplash.com/400x300/?${cropName},crop,farm`;

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="md:w-1/2">
        <img
          src={imageUrl}
          alt={cropName}
          className="rounded-2xl w-full object-cover shadow-lg"
          style={{ maxHeight: "340px" }}
          onError={(e) => { e.target.src = "https://source.unsplash.com/400x300/?agriculture,field"; }}
        />
      </div>
      <div className="md:w-1/2 text-center">
        <div className={`text-6xl mb-4`}>🌾</div>
        <p className={`text-sm font-medium mb-2 ${darkMode ? "text-green-400" : "text-green-600"}`}>Recommended Crop</p>
        <h3 className={`text-4xl font-bold mb-4 capitalize ${darkMode ? "text-green-300" : "text-green-800"}`}>{result}</h3>
        <p className={`text-sm leading-relaxed mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          This prediction is based on the soil and climate data you provided. Results may vary depending on local conditions.
        </p>
        <button onClick={onBack} className="btn-outline-eco">← Try Again</button>
      </div>
    </div>
  );
}

function Croprecommend({ darkMode, user }) {
  const [result, setResult] = useState(null);

  const handleSubmit = async (formValues) => {
    try {
      // Use local predictor instantly, then try API in background for accuracy
      const localResult = predictCrop({
        N: +formValues.N, P: +formValues.P, K: +formValues.K,
        temperature: +formValues.temperature,
        humidity: +formValues.humidity,
        ph: +formValues.ph,
        rainfall: +formValues.rainfall,
      });
      setResult(localResult);
      if (user) await saveHistory(user.uid, "crop", formValues, localResult);

      // Try API in background to update with ML result
      fetch("https://karthikcropapi.onrender.com/predict", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      }).then((res) => res.json()).then((data) => {
        if (data.result) setResult(data.result);
      }).catch(() => {}); // silently fail if API is sleeping
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
          🌾 AI Model 1
        </div>
        <h2 className="section-title mb-3">Crop Recommendation</h2>
        <p className={`max-w-xl mx-auto text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Enter your soil nutrients and climate data to get the best crop recommendation for your field.
        </p>
      </div>

      <div className={`eco-card p-8 ${darkMode ? "bg-gray-800/60" : ""}`}>
        {result
          ? <CropResult result={result} onBack={() => setResult(null)} darkMode={darkMode} />
          : <CropForm onSubmit={handleSubmit} darkMode={darkMode} />
        }
      </div>
    </div>
  );
}

export default Croprecommend;
