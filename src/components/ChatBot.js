import { useState, useRef, useEffect } from "react";

// Farming knowledge base for instant responses
const FARMING_KB = {
  greetings: ["hi", "hello", "hey", "namaste"],
  farewells: ["bye", "goodbye", "thanks", "thank you"],
  topics: {
    rice: {
      keywords: ["rice", "paddy", "dhan"],
      response: "🌾 **Rice** grows best with:\n- N: 60-120 kg/ha, P: 30-60, K: 30-60\n- Temperature: 22-35°C\n- Humidity: 75-90%\n- Rainfall: 150-300mm\n- pH: 5.5-7.0\n\nBest season: Kharif (June-July planting). Needs flooded fields during early growth.",
    },
    wheat: {
      keywords: ["wheat", "gehun"],
      response: "🌿 **Wheat** grows best with:\n- N: 60-120 kg/ha, P: 30-60, K: 30-60\n- Temperature: 10-25°C\n- Humidity: 40-70%\n- Rainfall: 50-150mm\n- pH: 6.0-7.5\n\nBest season: Rabi (Oct-Nov planting). Cool weather crop.",
    },
    fertilizer: {
      keywords: ["fertilizer", "fertiliser", "npk", "urea", "dap", "nutrient", "khad"],
      response: "💧 **Fertilizer Guide:**\n- **Urea** → Low Nitrogen soils\n- **DAP** → Low N + P soils\n- **MOP** → Low Potassium\n- **NPK 17-17-17** → Balanced deficiency\n- **Compost** → Organic matter improvement\n\nTip: Always do a soil test before applying fertilizers.",
    },
    disease: {
      keywords: ["disease", "blight", "rust", "fungus", "pest", "infection", "yellow", "spots", "rot"],
      response: "🔬 **Common Plant Diseases:**\n- **Early Blight** → Apply chlorothalonil fungicide\n- **Late Blight** → Apply mancozeb immediately\n- **Powdery Mildew** → Neem oil or sulfur spray\n- **Leaf Rust** → Azoxystrobin fungicide\n- **Bacterial Spot** → Copper-based bactericide\n\nUpload a photo in Disease Detection for AI diagnosis!",
    },
    soil: {
      keywords: ["soil", "ph", "nitrogen", "phosphorus", "potassium", "mitti"],
      response: "🧪 **Soil Health Tips:**\n- **pH 6-7** is ideal for most crops\n- **Low N** → Add Urea or compost\n- **Low P** → Add DAP or SSP\n- **Low K** → Add MOP\n- **Acidic soil** → Add lime\n- **Alkaline soil** → Add sulfur\n\nUse our Soil Health Calculator for a detailed score!",
    },
    weather: {
      keywords: ["weather", "rain", "temperature", "humidity", "monsoon", "barish"],
      response: "🌤️ **Weather & Farming:**\n- Check the Dashboard for real-time weather\n- 7-day forecast helps plan irrigation\n- High humidity (>80%) → Risk of fungal diseases\n- Low rainfall → Increase irrigation frequency\n- Temperature >40°C → Use shade nets for vegetables",
    },
    market: {
      keywords: ["price", "market", "mandi", "sell", "rate", "bhav"],
      response: "📈 **Market Tips:**\n- Check live prices in the Market section\n- Best time to sell: after harvest when supply is low\n- Store crops properly to sell at better prices\n- Rice prices peak in Jan-Feb\n- Wheat prices peak in May-June\n- Vegetables: sell within 2-3 days of harvest",
    },
    irrigation: {
      keywords: ["water", "irrigation", "drip", "sprinkler", "paani", "sinchai"],
      response: "💧 **Irrigation Guide:**\n- **Drip irrigation** → 40-60% water saving\n- **Sprinkler** → Good for wheat, vegetables\n- **Flood irrigation** → Best for rice\n- Water in early morning or evening\n- Check soil moisture before watering\n- Overwatering causes root rot",
    },
    organic: {
      keywords: ["organic", "natural", "compost", "vermicompost", "jeevamrit"],
      response: "🌱 **Organic Farming:**\n- **Compost** → Improves soil structure\n- **Vermicompost** → Rich in nutrients\n- **Jeevamrit** → Natural growth promoter\n- **Neem cake** → Pest repellent + fertilizer\n- Organic farming improves soil health long-term\n- Certification takes 3 years",
    },
    crop_rotation: {
      keywords: ["rotation", "intercrop", "mixed", "sequence"],
      response: "🔄 **Crop Rotation Benefits:**\n- Breaks pest and disease cycles\n- Improves soil fertility naturally\n- Reduces fertilizer needs\n\n**Good rotations:**\n- Rice → Wheat → Legume\n- Maize → Soybean → Wheat\n- Cotton → Chickpea → Wheat\n\nAlways follow a cereal with a legume!",
    },
  },
};

function getBotResponse(message) {
  const msg = message.toLowerCase().trim();

  // Greetings
  if (FARMING_KB.greetings.some(g => msg.includes(g))) {
    return "👋 Hello! I'm your AI Farming Assistant. Ask me about crops, fertilizers, diseases, soil health, irrigation, or market prices!";
  }

  // Farewells
  if (FARMING_KB.farewells.some(g => msg.includes(g))) {
    return "🌿 Happy farming! Feel free to ask anytime. Good luck with your crops! 🌾";
  }

  // Topic matching
  for (const topic of Object.values(FARMING_KB.topics)) {
    if (topic.keywords.some(k => msg.includes(k))) {
      return topic.response;
    }
  }

  // Crop recommendation hint
  if (msg.includes("recommend") || msg.includes("suggest") || msg.includes("which crop") || msg.includes("best crop")) {
    return "🌾 For personalized crop recommendations, use our **Crop Recommendation** tool! Enter your soil nutrients (N, P, K), temperature, humidity, pH, and rainfall — our AI will suggest the best crop for your field.\n\nOr ask me about a specific crop like rice, wheat, maize, cotton, etc.!";
  }

  // Help
  if (msg.includes("help") || msg.includes("what can you") || msg.includes("features")) {
    return "🤖 I can help you with:\n\n🌾 **Crops** — Rice, Wheat, Maize, Cotton, etc.\n💧 **Fertilizers** — NPK, Urea, DAP, organic\n🔬 **Diseases** — Identification & treatment\n🧪 **Soil** — pH, nutrients, health\n💧 **Irrigation** — Methods & timing\n📈 **Market** — Prices & selling tips\n🌱 **Organic farming** — Natural methods\n\nJust ask your question!";
  }

  // Default
  return "🌱 I'm not sure about that specific question. Try asking about:\n- A specific crop (rice, wheat, maize)\n- Fertilizer recommendations\n- Plant diseases\n- Soil health\n- Irrigation methods\n- Market prices\n\nOr use our AI tools for precise predictions!";
}

export default function ChatBot({ darkMode }) {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hi! I'm your AI Farming Assistant. Ask me anything about crops, fertilizers, diseases, or farming tips!" }
  ]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const bottomRef             = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(userMsg);
      setMessages(prev => [...prev, { role: "bot", text: response }]);
      setTyping(false);
    }, 600);
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  const suggestions = ["Best crop for Punjab?", "Fertilizer for wheat", "Rice disease treatment", "Soil pH tips"];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all hover:scale-110 ${
          open ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-br from-green-500 to-emerald-600 hover:shadow-green-500/40"
        }`}
        aria-label="Open farming assistant"
      >
        {open ? "✕" : "🌿"}
      </button>

      {/* Chat window */}
      {open && (
        <div className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${
          darkMode ? "bg-gray-900 border-green-900" : "bg-white border-green-100"
        }`} style={{ height: "480px" }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl">🌾</div>
            <div>
              <p className="text-white text-sm font-semibold">AI Farming Assistant</p>
              <p className="text-green-100 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" /> Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-0.5">
                    🌿
                  </div>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-br-sm"
                    : darkMode ? "bg-gray-800 text-gray-200 rounded-bl-sm" : "bg-green-50 text-gray-700 rounded-bl-sm"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-sm mr-2">🌿</div>
                <div className={`px-3 py-2 rounded-2xl rounded-bl-sm ${darkMode ? "bg-gray-800" : "bg-green-50"}`}>
                  <div className="flex gap-1 items-center h-4">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => { setInput(s); }}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    darkMode ? "border-green-800 text-green-400 hover:bg-green-900/40" : "border-green-200 text-green-700 hover:bg-green-50"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className={`p-3 border-t flex gap-2 ${darkMode ? "border-green-900" : "border-green-100"}`}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about crops, soil, diseases..."
              className={`flex-1 text-xs px-3 py-2 rounded-xl outline-none border transition-all ${
                darkMode ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-green-600" : "bg-green-50 border-green-100 text-gray-700 placeholder-gray-400 focus:border-green-400"
              }`}
            />
            <button onClick={send} disabled={!input.trim()}
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm disabled:opacity-40 hover:shadow-md transition-all">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
