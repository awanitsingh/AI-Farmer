import { useNavigate } from "react-router-dom";

const stats = [
  { icon: "🌾", value: "22+",  label: "Crop Types" },
  { icon: "🔬", value: "38+",  label: "Diseases Detected" },
  { icon: "🎯", value: "95%+", label: "Model Accuracy" },
  { icon: "👨‍🌾", value: "100%", label: "Free to Use" },
];

const features = [
  { icon: "🌾", title: "Crop Recommendation",    desc: "Get the best crop for your soil and climate using ML predictions based on N, P, K, pH, and rainfall." },
  { icon: "💧", title: "Fertilizer Suggestion",  desc: "Precise fertilizer recommendations based on soil type, crop type, and nutrient deficiencies." },
  { icon: "🔬", title: "Disease Detection",      desc: "Upload a plant photo — our deep learning model identifies diseases and suggests treatments instantly." },
  { icon: "📈", title: "Market Prices",          desc: "Live indicative crop prices with 7-day trend charts and category filters for smart selling decisions." },
  { icon: "🔮", title: "Future Predictions",     desc: "AI forecasts for crop yield, price trends, soil degradation, and optimal planting time." },
  { icon: "🌤️", title: "Weather & Dashboard",   desc: "Real-time weather with 7-day forecast, soil health calculator, crop calendar, and prediction history." },
];

const steps = [
  { step: "01", icon: "📝", title: "Create Account",    desc: "Sign up for free in seconds with just your email." },
  { step: "02", icon: "🌱", title: "Enter Farm Data",   desc: "Input your soil nutrients, climate, and crop details." },
  { step: "03", icon: "🤖", title: "Get AI Insights",   desc: "Receive instant ML-powered recommendations and forecasts." },
  { step: "04", icon: "🚀", title: "Grow Smarter",      desc: "Apply insights to maximize yield and reduce waste." },
];

function Landing({ darkMode }) {
  const navigate = useNavigate();

  return (
    <div className={darkMode ? "bg-gray-950 text-green-100" : "bg-white text-gray-900"}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        darkMode ? "bg-gray-950" : "bg-gradient-to-br from-green-50 via-white to-emerald-50"
      }`}>
        {/* Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-anim pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 float-anim pointer-events-none" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float-anim pointer-events-none" style={{ animationDelay: "4s" }} />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center fade-in-up py-20">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border ${
            darkMode ? "bg-green-900/50 text-green-300 border-green-700" : "bg-green-100 text-green-700 border-green-200"
          }`}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            AI-Powered Sustainable Farming Platform
          </div>

          {/* Headline */}
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${
            darkMode ? "text-green-100" : "text-gray-900"
          }`}>
            Farm Smarter,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                Grow Better
              </span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-green-200 opacity-40 rounded-full -z-0" />
            </span>
            <br />
            with AI Farmer
          </h1>

          <p className={`mx-auto max-w-2xl text-lg leading-relaxed mb-10 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            The all-in-one AI platform for farmers — crop recommendations, fertilizer guidance,
            disease detection, market prices, and future predictions. All powered by machine learning.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button onClick={() => navigate("/signup")} className="btn-eco text-base px-8 py-3">
              🌱 Start for Free
            </button>
            <button onClick={() => navigate("/signin")} className="btn-outline-eco text-base px-8 py-3">
              Sign In →
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className={`eco-card p-4 text-center ${darkMode ? "bg-gray-800/60" : ""}`}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>{s.value}</div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Scroll to explore</span>
          <span className={`text-lg ${darkMode ? "text-green-600" : "text-green-400"}`}>↓</span>
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────────────────────── */}
      <section id="features" className={`py-24 ${darkMode ? "bg-gray-900" : "bg-green-50"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
              darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
            }`}>🤖 6 Powerful AI Features</div>
            <h2 className="section-title mb-3">Everything You Need to Farm Smarter</h2>
            <p className={`max-w-xl mx-auto text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Sign in to unlock all features. Each tool is powered by machine learning trained on real agricultural data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} onClick={() => navigate("/signup")}
                className={`group relative rounded-2xl border p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  darkMode ? "bg-gray-800/60 border-green-900 hover:border-green-700" : "bg-white border-green-100 hover:border-green-300"
                }`}>
                <div className="absolute top-4 right-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? "bg-yellow-900/40 text-yellow-400" : "bg-yellow-50 text-yellow-600"}`}>
                    🔒 Login to use
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm ${
                  darkMode ? "bg-green-900/50" : "bg-green-50"
                }`}>{f.icon}</div>
                <h3 className={`text-base font-bold mb-2 ${darkMode ? "text-green-200" : "text-gray-800"}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{f.desc}</p>
                <div className={`mt-4 text-xs font-semibold flex items-center gap-1 ${darkMode ? "text-green-400" : "text-green-600"} group-hover:gap-2 transition-all`}>
                  Get Started <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className={`py-24 ${darkMode ? "bg-gray-950" : "bg-white"}`}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
              darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
            }`}>🚀 Simple Process</div>
            <h2 className="section-title mb-3">How It Works</h2>
            <p className={`max-w-xl mx-auto text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Get started in minutes and start making data-driven farming decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className={`hidden lg:block absolute top-8 left-[60%] w-full h-0.5 ${
                    darkMode ? "bg-green-900" : "bg-green-100"
                  }`} />
                )}
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-md ${
                  darkMode ? "bg-green-900/50" : "bg-green-50"
                }`}>
                  {s.icon}
                  <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    darkMode ? "bg-green-700 text-green-200" : "bg-green-500 text-white"
                  }`}>{s.step}</span>
                </div>
                <h3 className={`text-sm font-bold mb-1 ${darkMode ? "text-green-200" : "text-gray-800"}`}>{s.title}</h3>
                <p className={`text-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl p-10 text-center relative overflow-hidden ${
            darkMode
              ? "bg-gradient-to-br from-green-900/60 to-emerald-900/40 border border-green-800"
              : "bg-gradient-to-br from-green-500 to-emerald-600"
          }`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🌿</div>
              <h2 className="text-3xl font-bold text-white mb-3">Ready to Farm Smarter?</h2>
              <p className="text-green-100 text-base mb-8 max-w-md mx-auto">
                Join thousands of farmers using AI to maximize yield, reduce costs, and grow sustainably.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => navigate("/signup")}
                  className="px-8 py-3 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition-all hover:shadow-lg text-base">
                  🌱 Get Started Free
                </button>
                <button onClick={() => navigate("/signin")}
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all text-base">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
