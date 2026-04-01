import { useState } from "react";
import { saveHistory } from "./utils/saveHistory";
import { predictCrop } from "./utils/cropPredictor";
import { autoFillFromLocation } from "./utils/autoFill";

const inputFields = [
  { name: "Nitrogen",    label: "Nitrogen (N)",      placeholder: "e.g. 90",  step: "1",    icon: "🧪" },
  { name: "Phosporus",   label: "Phosphorus (P)",     placeholder: "e.g. 42",  step: "1",    icon: "🧫" },
  { name: "Potassium",   label: "Potassium (K)",      placeholder: "e.g. 43",  step: "1",    icon: "⚗️" },
  { name: "Temperature", label: "Temperature (°C)",   placeholder: "e.g. 25.5",step: "0.01", icon: "🌡️" },
  { name: "Humidity",    label: "Humidity (%)",        placeholder: "e.g. 80",  step: "0.01", icon: "💧" },
  { name: "Ph",          label: "pH Value",            placeholder: "e.g. 6.5", step: "0.01", icon: "🔬" },
  { name: "Rainfall",    label: "Rainfall (mm)",       placeholder: "e.g. 200", step: "0.01", icon: "🌧️" },
];

function CropForm({ onSubmit, darkMode }) {
  const [formValues, setFormValues] = useState({
    N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: "",
  });
  const [loading, setLoading]     = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);
  const [autoMsg, setAutoMsg]     = useState("");

  const keyMap = {
    Nitrogen: "N", Phosporus: "P", Potassium: "K",
    Temperature: "temperature", Humidity: "humidity", Ph: "ph", Rainfall: "rainfall",
  };

  const handleChange = (e) => {
    const key = keyMap[e.target.name];
    setFormValues({ ...formValues, [key]: e.target.value });
  };

  const handleAutoFill = async () => {
    setAutoLoading(true);
    setAutoMsg("");
    try {
      const data = await autoFillFromLocation();
      setFormValues({
        N:           data.N,
        P:           data.P,
        K:           data.K,
        temperature: data.temperature,
        humidity:    data.humidity,
        ph:          data.ph,
        rainfall:    data.rainfall,
      });
      setAutoMsg("✅ Values auto-filled from your location!");
      setTimeout(() => setAutoMsg(""), 3000);
    } catch {
      setAutoMsg("⚠️ Could not detect location. Please allow location access.");
      setTimeout(() => setAutoMsg(""), 4000);
    } finally {
      setAutoLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formValues);
    setLoading(false);
  };

  // Map state keys back to input field names for value binding
  const valueMap = {
    Nitrogen: "N", Phosporus: "P", Potassium: "K",
    Temperature: "temperature", Humidity: "humidity", Ph: "ph", Rainfall: "rainfall",
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Auto-fill button */}
      <div className="flex items-center justify-between mb-4">
        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Enter values manually or auto-fill from your location
        </p>
        <button
          type="button"
          onClick={handleAutoFill}
          disabled={autoLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            darkMode ? "bg-green-900/50 text-green-300 hover:bg-green-900" : "bg-green-100 text-green-700 hover:bg-green-200"
          } disabled:opacity-50`}
        >
          {autoLoading ? "📍 Detecting..." : "📍 Auto-fill from Location"}
        </button>
      </div>

      {autoMsg && (
        <div className={`mb-4 p-2 rounded-xl text-xs text-center ${
          autoMsg.startsWith("✅") ? (darkMode ? "bg-green-900/40 text-green-300" : "bg-green-50 text-green-700")
            : (darkMode ? "bg-yellow-900/40 text-yellow-300" : "bg-yellow-50 text-yellow-700")
        }`}>{autoMsg}</div>
      )}

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
              value={formValues[valueMap[f.name]] ?? ""}
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
  const cropName = result?.split(" ")[0] || "farm";

  const cropImages = {
    rice:        "https://images.pexels.com/photos/1537169/pexels-photo-1537169.jpeg?w=400",
    maize:       "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?w=400",
    chickpea:    "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?w=400",
    kidneybeans: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?w=400",
    pigeonpeas:  "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?w=400",
    mothbeans:   "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?w=400",
    mungbean:    "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?w=400",
    blackgram:   "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?w=400",
    lentil:      "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?w=400",
    pomegranate: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?w=400",
    banana:      "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?w=400",
    mango:       "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?w=400",
    grapes:      "https://images.pexels.com/photos/760281/pexels-photo-760281.jpeg?w=400",
    watermelon:  "https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?w=400",
    muskmelon:   "https://images.pexels.com/photos/2894205/pexels-photo-2894205.jpeg?w=400",
    apple:       "https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?w=400",
    orange:      "https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?w=400",
    papaya:      "https://images.pexels.com/photos/2363345/pexels-photo-2363345.jpeg?w=400",
    coconut:     "https://images.pexels.com/photos/1120970/pexels-photo-1120970.jpeg?w=400",
    cotton:      "https://images.pexels.com/photos/5029859/pexels-photo-5029859.jpeg?w=400",
    jute:        "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=400",
    coffee:      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?w=400",
  };

  const key = cropName.toLowerCase().replace(/\s/g, "");
  const img = cropImages[key] || "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=400";

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="md:w-1/2">
        <img
          src={img}
          alt={cropName}
          className="rounded-2xl w-full object-cover shadow-lg bg-green-50"
          style={{ maxHeight: "340px", minHeight: "200px" }}
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
