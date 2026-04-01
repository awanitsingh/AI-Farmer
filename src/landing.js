import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "./components/Logo";

const CROPS = ["Rice 🌾", "Wheat 🌿", "Maize 🌽", "Cotton 🌸", "Mango 🥭", "Banana 🍌"];

function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const speed = deleting ? 60 : 100;
    const timer = setTimeout(() => {
      if (!deleting && displayed === word) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && displayed === "") {
        setDeleting(false);
        setIdx(i => i + 1);
      } else {
        setDisplayed(prev => deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1));
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
      {displayed}<span className="animate-pulse">|</span>
    </span>
  );
}

const features = [
  { icon: "🌾", title: "Crop Recommendation",  desc: "ML-powered crop suggestions based on soil & climate data", color: "from-green-400 to-emerald-500" },
  { icon: "💧", title: "Fertilizer Guidance",   desc: "Precise nutrient recommendations for maximum yield",        color: "from-teal-400 to-green-500"   },
  { icon: "🔬", title: "Disease Detection",     desc: "Upload a photo — AI identifies diseases instantly",         color: "from-emerald-400 to-teal-500" },
  { icon: "📈", title: "Market Prices",         desc: "Live mandi prices with trend charts",                       color: "from-blue-400 to-green-500"   },
  { icon: "🔮", title: "Future Predictions",    desc: "Yield, price & soil health forecasts",                      color: "from-purple-400 to-green-500" },
  { icon: "🌤️", title: "Smart Dashboard",       desc: "Weather, history, soil calculator & more",                 color: "from-orange-400 to-green-500" },
];

const testimonials = [
  { name: "Rajesh Kumar",  location: "Punjab",      text: "AI Farmer helped me choose the right crop. My yield increased by 35% this season!", avatar: "👨‍🌾" },
  { name: "Priya Sharma",  location: "Maharashtra", text: "Disease detection saved my tomato crop. Identified blight early and treated it in time.", avatar: "👩‍🌾" },
  { name: "Suresh Patel",  location: "Gujarat",     text: "Market price predictions helped me sell at the right time. Made 20% more profit!", avatar: "🧑‍🌾" },
];

const steps = [
  { step: "01", icon: "📝", title: "Create Free Account", desc: "Sign up with just your email. No credit card needed." },
  { step: "02", icon: "🌱", title: "Enter Farm Details",  desc: "Input soil data or auto-fill from your location." },
  { step: "03", icon: "🚀", title: "Get AI Insights",     desc: "Receive instant recommendations and grow smarter." },
];

export default function Landing({ darkMode }) {
  const navigate = useNavigate();
  const [activeT, setActiveT] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveT(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  const gridStyle = {
    backgroundImage: "linear-gradient(rgba(34,197,94,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.15) 1px, transparent 1px)",
    backgroundSize: "50px 50px",
  };

  return (
    <div className={darkMode ? "bg-gray-950" : "bg-white"}>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-green-950 to-emerald-900">
        <div className="absolute inset-0 opacity-100" style={gridStyle} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-400 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <span className="text-white text-lg font-bold">AI Farmer</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/signin")} className="text-green-300 text-sm font-medium hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={() => navigate("/signup")} className="px-5 py-2 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-full transition-all hover:shadow-lg">
              Get Started →
            </button>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI-Powered Agriculture Platform
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Grow Smarter with<br />
              <TypeWriter words={CROPS} />
            </h1>

            <p className="text-green-200 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              AI Farmer uses machine learning to give you instant crop recommendations,
              fertilizer guidance, disease detection, and market insights — all in one platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button onClick={() => navigate("/signup")} className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full text-base hover:shadow-2xl transition-all hover:-translate-y-1">
                🌱 Start for Free
              </button>
              <button
                onClick={() => { const el = document.getElementById("features-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full text-base border border-white/20 hover:bg-white/20 transition-all"
              >
                See Features ↓
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { value: "22+",  label: "Crop Types", icon: "�" },
                { value: "38+",  label: "Diseases",   icon: "🔬" },
                { value: "95%+", label: "Accuracy",   icon: "🎯" },
                { value: "Free", label: "Always",     icon: "🆓" },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-green-300 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="relative z-10 -mb-1">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-16" fill={darkMode ? "#030712" : "#f9fafb"}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features-section" className={`py-24 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"}`}>
              🤖 6 AI-Powered Features
            </span>
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Everything a Smart Farmer Needs
            </h2>
            <p className={`max-w-xl mx-auto text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Sign in to unlock all features. Each tool is trained on real agricultural data.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} onClick={() => navigate("/signup")}
                className={`group relative p-6 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border ${
                  darkMode ? "bg-gray-900 border-gray-800 hover:border-green-800" : "bg-white border-gray-100 hover:border-green-200"
                }`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <div className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">🔒</div>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{f.desc}</p>
                <div className={`mt-4 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all ${darkMode ? "text-green-400" : "text-green-600"}`}>
                  Try it free <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={`py-24 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"}`}>
              🚀 Simple Process
            </span>
            <h2 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Get Started in 3 Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center relative">
                {i < 2 && <div className={`hidden md:block absolute top-8 left-[65%] w-[70%] h-0.5 ${darkMode ? "bg-green-900" : "bg-green-100"}`} />}
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 ${darkMode ? "bg-green-900/50" : "bg-green-50"}`}>
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center bg-green-500 text-white">{s.step}</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>{s.title}</h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`py-24 ${darkMode ? "bg-gray-950" : "bg-green-50"}`}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"}`}>
            💬 Farmer Stories
          </span>
          <h2 className={`text-4xl font-bold mb-12 ${darkMode ? "text-white" : "text-gray-900"}`}>Trusted by Farmers</h2>
          <div className={`p-8 rounded-3xl transition-all duration-500 ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"}`}>
            <div className="text-5xl mb-4">{testimonials[activeT].avatar}</div>
            <p className={`text-lg italic mb-6 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              "{testimonials[activeT].text}"
            </p>
            <p className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}>{testimonials[activeT].name}</p>
            <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{testimonials[activeT].location}</p>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveT(i)}
                className={`h-2 rounded-full transition-all ${i === activeT ? "bg-green-500 w-6" : `w-2 ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="text-6xl mb-6">🌿</div>
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Farm Smarter?</h2>
          <p className="text-green-100 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of farmers using AI to maximize yield, reduce costs, and grow sustainably.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/signup")} className="px-10 py-4 bg-white text-green-700 font-bold rounded-full text-base hover:bg-green-50 transition-all hover:shadow-xl">
              🌱 Get Started Free
            </button>
            <button onClick={() => navigate("/signin")} className="px-10 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full text-base hover:bg-white/10 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
