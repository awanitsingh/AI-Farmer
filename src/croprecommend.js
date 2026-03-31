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
  const cropName = result?.split(" ")[0] || "farm";
  const imageUrl = `https://api.pexels.com/v1/search?query=${cropName}`;
  
  // Use Wikimedia Commons for crop images - reliable and free
  const cropImages = {
    rice: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/White_rice.jpg/320px-White_rice.jpg",
    maize: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Corn_-_Zea_mays_-_geograph.org.uk_-_1400982.jpg/320px-Corn_-_Zea_mays_-_geograph.org.uk_-_1400982.jpg",
    chickpea: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Chickpeas.jpg/320px-Chickpeas.jpg",
    kidneybeans: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kidney_beans.jpg/320px-Kidney_beans.jpg",
    pigeonpeas: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cajanus_cajan_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-168.jpg/320px-Cajanus_cajan_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-168.jpg",
    mothbeans: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Moth_bean.jpg/320px-Moth_bean.jpg",
    mungbean: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Mung_beans.jpg/320px-Mung_beans.jpg",
    blackgram: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vigna_mungo.jpg/320px-Vigna_mungo.jpg",
    lentil: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Lentil_-_Lens_culinaris.jpg/320px-Lentil_-_Lens_culinaris.jpg",
    pomegranate: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Pomegranate_fruit_-_whole.jpg/320px-Pomegranate_fruit_-_whole.jpg",
    banana: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Platano.jpg/320px-Banana-Platano.jpg",
    mango: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg",
    grapes: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Kyoho-grape.jpg/320px-Kyoho-grape.jpg",
    watermelon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png",
    muskmelon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Muskmelon_Fruit.jpg/320px-Muskmelon_Fruit.jpg",
    apple: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/320px-Red_Apple.jpg",
    orange: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Oranges_and_orange_juice.jpg/320px-Oranges_and_orange_juice.jpg",
    papaya: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Carica_papaya_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-028.jpg/320px-Carica_papaya_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-028.jpg",
    coconut: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Coconut_on_white_background.jpg/320px-Coconut_on_white_background.jpg",
    cotton: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cotton_field_kv07.jpg/320px-Cotton_field_kv07.jpg",
    jute: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Jute_Field_Bangladesh.jpg/320px-Jute_Field_Bangladesh.jpg",
    coffee: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/320px-A_small_cup_of_coffee.JPG",
  };

  const key = cropName.toLowerCase().replace(/\s/g, "");
  const img = cropImages[key] || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg";

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
