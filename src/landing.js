import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "./components/Logo";

const CROPS = ["Rice", "Wheat", "Maize", "Cotton", "Mango", "Sugarcane"];

function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const timer = setTimeout(() => {
      if (!deleting && displayed === word) { setTimeout(() => setDeleting(true), 1800); return; }
      if (deleting && displayed === "") { setDeleting(false); setIdx(i => i + 1); return; }
      setDisplayed(prev => deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1));
    }, deleting ? 50 : 90);
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, words]);
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
      {displayed}<span className="animate-pulse text-green-500">|</span>
    </span>
  );
}

const features = [
  { icon: "🌾", title: "Crop Recommendation",  desc: "Enter soil nutrients and climate data to get the perfect crop instantly.", iconBg: "bg-green-100",   darkBg: "bg-green-900/30"  },
  { icon: "💧", title: "Fertilizer Guidance",   desc: "Precise NPK recommendations based on soil type and crop.",                iconBg: "bg-teal-100",    darkBg: "bg-teal-900/30"   },
  { icon: "🔬", title: "Disease Detection",     desc: "Upload a leaf photo and AI identifies diseases in seconds.",              iconBg: "bg-emerald-100", darkBg: "bg-emerald-900/30"},
  { icon: "📈", title: "Market Prices",         desc: "Live mandi prices with 7-day trend charts and category filters.",         iconBg: "bg-blue-100",    darkBg: "bg-blue-900/30"   },
  { icon: "🔮", title: "Future Predictions",    desc: "AI forecasts for yield, price trends, and soil health.",                  iconBg: "bg-purple-100",  darkBg: "bg-purple-900/30" },
  { icon: "🌤️", title: "Smart Dashboard",       desc: "Real-time weather, history, soil calculator and crop calendar.",         iconBg: "bg-orange-100",  darkBg: "bg-orange-900/30" },
];

const testimonials = [
  { name: "Rajesh Kumar",  role: "Wheat Farmer, Punjab",         quote: "AI Farmer helped me choose the right crop. My yield increased by 35% this season!", avatar: "RK" },
  { name: "Priya Sharma",  role: "Vegetable Grower, Maharashtra", quote: "Disease detection saved my tomato crop. Identified blight early and treated it in time.", avatar: "PS" },
  { name: "Suresh Patel",  role: "Cotton Farmer, Gujarat",       quote: "Market price predictions helped me sell at the right time. Made 20% more profit!", avatar: "SP" },
];

export default function Landing({ darkMode }) {
  const navigate = useNavigate();
  const [activeT, setActiveT] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveT(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const bg   = darkMode ? "bg-gray-900"  : "bg-white";
  const bg2  = darkMode ? "bg-gray-950" : "bg-gray-50";
  const text = darkMode ? "text-white"   : "text-gray-900";
  const sub  = darkMode ? "text-gray-400": "text-gray-500";

  return (
    <div className={bg}>

      {/* HERO */}
      <section className={`relative overflow-hidden ${bg} min-h-screen flex items-center`}>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-green-100 to-transparent rounded-full -translate-y-1/3 translate-x-1/4 opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100 to-transparent rounded-full translate-y-1/2 -translate-x-1/4 opacity-30 pointer-events-none" />
        {darkMode && <div className="absolute inset-0 bg-gradient-to-br from-green-950/20 to-transparent pointer-events-none" />}

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border ${
              darkMode ? "bg-green-900/40 border-green-700 text-green-300" : "bg-green-50 border-green-200 text-green-700"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              AI-Powered Agriculture Platform
            </div>

            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${text}`}>
              Grow Smarter<br />with <TypeWriter words={CROPS} />
            </h1>

            <p className={`text-lg max-w-xl mb-10 leading-relaxed ${sub}`}>
              Machine learning meets agriculture. Get instant crop recommendations,
              fertilizer guidance, disease detection, and market insights — all free.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button onClick={() => navigate("/signup")}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full text-base shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all">
                Start for Free
              </button>
              <button onClick={() => { const el = document.getElementById("features-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className={`px-8 py-4 font-semibold rounded-full text-base border transition-all hover:-translate-y-0.5 ${
                  darkMode ? "border-gray-700 text-gray-300 hover:border-green-600 hover:text-green-400" : "border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600"
                }`}>
                Explore Features
              </button>
            </div>

            <div className="flex flex-wrap gap-10">
              {[
                { value: "22+",  label: "Crop Types" },
                { value: "38+",  label: "Diseases Detected" },
                { value: "95%+", label: "Model Accuracy" },
                { value: "Free", label: "Always" },
              ].map((s, i) => (
                <div key={i}>
                  <div className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>{s.value}</div>
                  <div className={`text-xs ${sub}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features-section" className={`py-24 ${bg2}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="text-center mb-16">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${darkMode ? "text-green-400" : "text-green-600"}`}>What We Offer</p>
            <h2 className={`text-4xl font-bold mb-4 ${text}`}>6 AI Tools for Modern Farming</h2>
            <p className={`max-w-xl mx-auto text-sm ${sub}`}>Each feature is powered by machine learning. Sign in to unlock everything — completely free.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} onClick={() => navigate("/signup")}
                className={`group p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  darkMode ? "bg-gray-800/60 border-gray-700 hover:border-green-700" : "bg-white border-gray-100 hover:border-green-200 hover:shadow-green-50"
                }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${darkMode ? f.darkBg : f.iconBg} group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">Login to use</span>
                </div>
                <h3 className={`font-bold mb-2 ${text}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${sub}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={`py-24 ${bg}`}>
        <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="text-center mb-16">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${darkMode ? "text-green-400" : "text-green-600"}`}>Simple Process</p>
            <h2 className={`text-4xl font-bold ${text}`}>Up and Running in Minutes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "01", icon: "📝", title: "Create Free Account",  desc: "Sign up with your email. No credit card needed." },
              { n: "02", icon: "🌱", title: "Enter Farm Details",   desc: "Input soil data or auto-fill from your GPS location." },
              { n: "03", icon: "🚀", title: "Get AI Insights",      desc: "Receive instant, accurate recommendations." },
            ].map((s, i) => (
              <div key={i} className={`relative p-8 rounded-2xl border text-center ${darkMode ? "bg-gray-800/60 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
                <div className={`text-6xl font-black mb-4 leading-none ${darkMode ? "text-green-900" : "text-green-100"}`}>{s.n}</div>
                <div className="text-4xl mb-3 -mt-8">{s.icon}</div>
                <h3 className={`font-bold mb-2 ${text}`}>{s.title}</h3>
                <p className={`text-sm leading-relaxed ${sub}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`py-24 ${bg2}`}>
        <div className="max-w-3xl mx-auto px-6 sm:px-12 lg:px-16 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${darkMode ? "text-green-400" : "text-green-600"}`}>Testimonials</p>
          <h2 className={`text-4xl font-bold mb-12 ${text}`}>Farmers Love AI Farmer</h2>
          <div className={`p-10 rounded-3xl border text-left ${darkMode ? "bg-gray-800/60 border-gray-700" : "bg-white border-gray-100 shadow-xl shadow-gray-100"}`}>
            <div className={`text-7xl font-serif leading-none mb-2 ${darkMode ? "text-green-900" : "text-green-100"}`}>"</div>
            <p className={`text-xl leading-relaxed mb-8 -mt-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              {testimonials[activeT].quote}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  {testimonials[activeT].avatar}
                </div>
                <div>
                  <p className={`font-bold text-sm ${text}`}>{testimonials[activeT].name}</p>
                  <p className={`text-xs ${sub}`}>{testimonials[activeT].role}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveT(i)}
                    className={`rounded-full transition-all ${i === activeT ? "w-6 h-2 bg-green-500" : `w-2 h-2 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="text-5xl mb-6">🌿</div>
          <h2 className="text-4xl font-bold text-white mb-4">Your Farm Deserves the Power of AI</h2>
          <p className="text-green-100 text-lg mb-10 max-w-xl mx-auto">Free forever. No credit card. Start making data-driven farming decisions today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/signup")}
              className="px-10 py-4 bg-white text-green-700 font-bold rounded-full text-base hover:bg-green-50 transition-all hover:shadow-xl hover:-translate-y-0.5">
              Create Free Account
            </button>
            <button onClick={() => navigate("/signin")}
              className="px-10 py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-full text-base hover:bg-white/10 hover:border-white transition-all">
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
