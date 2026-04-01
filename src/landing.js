import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "./components/Logo";

// Real farm photography from Pexels
const HERO_BG = "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1920";
const FARM_IMGS = [
  "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?w=600",
  "https://images.pexels.com/photos/1382102/pexels-photo-1382102.jpeg?w=600",
  "https://images.pexels.com/photos/5029859/pexels-photo-5029859.jpeg?w=600",
];

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
  return <span className="text-green-400">{displayed}<span className="animate-pulse opacity-70">|</span></span>;
}

const features = [
  { icon: "🌾", title: "Crop Recommendation",  desc: "Enter soil nutrients & climate data — get the perfect crop for your field instantly.", tag: "AI Model 1" },
  { icon: "💧", title: "Fertilizer Guidance",   desc: "Precise NPK recommendations based on soil type, crop, and nutrient deficiencies.",   tag: "AI Model 2" },
  { icon: "🔬", title: "Disease Detection",     desc: "Upload a leaf photo — our deep learning model identifies diseases in seconds.",       tag: "AI Model 3" },
  { icon: "📈", title: "Market Prices",         desc: "Live indicative mandi prices with 7-day trend charts and category filters.",         tag: "Live Data"  },
  { icon: "🔮", title: "Future Predictions",    desc: "AI forecasts for crop yield, price trends, soil health, and planting time.",         tag: "Forecasting"},
  { icon: "🌤️", title: "Smart Dashboard",       desc: "Real-time weather, 7-day forecast, soil calculator, crop calendar & history.",      tag: "Dashboard"  },
];

const testimonials = [
  { name: "Rajesh Kumar",  role: "Wheat Farmer",   location: "Punjab",      quote: "AI Farmer helped me choose the right crop for my soil. My yield increased by 35% this season!", avatar: "RK" },
  { name: "Priya Sharma",  role: "Vegetable Grower",location: "Maharashtra", quote: "Disease detection saved my tomato crop. Identified blight early and treated it in time.",       avatar: "PS" },
  { name: "Suresh Patel",  role: "Cotton Farmer",  location: "Gujarat",     quote: "Market price predictions helped me sell at the right time. Made 20% more profit this year!",    avatar: "SP" },
];

export default function Landing({ darkMode }) {
  const navigate = useNavigate();
  const [activeT, setActiveT] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef();

  useEffect(() => {
    const t = setInterval(() => setActiveT(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={darkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Parallax background */}
        <div className="absolute inset-0"
          style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center", transform: `translateY(${scrollY * 0.3}px)`, filter: "brightness(0.35)" }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/60 to-transparent" />

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 sm:px-16 py-6">
          <div className="flex items-center gap-3">
            <Logo size={38} />
            <span className="text-white text-xl font-bold tracking-tight">AI Farmer</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/signin")} className="text-white/80 text-sm font-medium hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={() => navigate("/signup")} className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-white text-sm font-bold rounded-full transition-all hover:shadow-lg hover:shadow-green-500/40 hover:-translate-y-0.5">
              Get Started Free
            </button>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center px-6 sm:px-16 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AI-Powered Agriculture Platform
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Smarter Farming<br />
              Starts with<br />
              <TypeWriter words={CROPS} />
            </h1>

            <p className="text-white/70 text-lg max-w-xl mb-10 leading-relaxed">
              Machine learning meets agriculture. Get instant crop recommendations,
              fertilizer guidance, disease detection, and market insights — all free.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button onClick={() => navigate("/signup")}
                className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full text-base transition-all hover:shadow-2xl hover:shadow-green-500/40 hover:-translate-y-1">
                🌱 Start for Free
              </button>
              <button onClick={() => { const el = document.getElementById("features-section"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-base border border-white/20 hover:bg-white/20 transition-all">
                Explore Features ↓
              </button>
            </div>

            {/* Floating stats */}
            <div className="flex flex-wrap gap-3">
              {[
                { value: "22+",  label: "Crop Types" },
                { value: "38+",  label: "Diseases Detected" },
                { value: "95%+", label: "Model Accuracy" },
                { value: "Free", label: "Always" },
              ].map((s, i) => (
                <div key={i} className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-white/60 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${darkMode ? "from-gray-950" : "from-white"} to-transparent`} />
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features-section" className={`py-28 ${darkMode ? "bg-gray-950" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${darkMode ? "text-green-400" : "text-green-600"}`}>
              What We Offer
            </p>
            <h2 className={`text-4xl sm:text-5xl font-bold mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
              6 AI Tools for Modern Farming
            </h2>
            <p className={`max-w-xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Each feature is powered by machine learning trained on real agricultural data.
              Sign in to unlock everything — completely free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} onClick={() => navigate("/signup")}
                className={`group relative p-7 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 border overflow-hidden ${
                  darkMode
                    ? "bg-gray-900/80 border-gray-800 hover:border-green-700 hover:bg-gray-900"
                    : "bg-gray-50 border-gray-100 hover:border-green-200 hover:bg-white hover:shadow-2xl hover:shadow-green-100"
                }`}>
                {/* Subtle gradient bg on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                      darkMode ? "bg-green-900/50" : "bg-green-100"
                    } group-hover:scale-110 transition-transform`}>
                      {f.icon}
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      darkMode ? "bg-gray-800 text-green-400" : "bg-green-100 text-green-700"
                    }`}>{f.tag}</span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed mb-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{f.desc}</p>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${darkMode ? "text-green-400" : "text-green-600"} group-hover:gap-2.5 transition-all`}>
                    <span className="w-4 h-4 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-500 text-xs">🔒</span>
                    Sign in to use →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ──────────────────────────────────────────────────── */}
      <section className="py-6 overflow-hidden">
        <div className="flex gap-4 px-6">
          {FARM_IMGS.map((img, i) => (
            <div key={i} className="flex-1 min-w-0 rounded-3xl overflow-hidden" style={{ height: "220px" }}>
              <img src={img} alt="farm" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className={`py-28 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${darkMode ? "text-green-400" : "text-green-600"}`}>Simple Process</p>
            <h2 className={`text-4xl sm:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Up and Running in Minutes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { n: "1", icon: "📝", title: "Create Free Account",  desc: "Sign up with your email. No credit card, no hidden fees." },
              { n: "2", icon: "🌱", title: "Enter Your Farm Data", desc: "Input soil nutrients or auto-fill from your GPS location." },
              { n: "3", icon: "🚀", title: "Get AI Insights",      desc: "Receive instant, accurate recommendations and forecasts." },
            ].map((s, i) => (
              <div key={i} className="relative text-center">
                {i < 2 && <div className={`hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed ${darkMode ? "border-green-900" : "border-green-200"}`} />}
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5 relative ${darkMode ? "bg-gray-800" : "bg-white shadow-lg"}`}>
                  {s.icon}
                  <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-black flex items-center justify-center ${darkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"}`}>{s.n}</span>
                </div>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>{s.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className={`py-28 ${darkMode ? "bg-gray-950" : "bg-white"}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${darkMode ? "text-green-400" : "text-green-600"}`}>Testimonials</p>
            <h2 className={`text-4xl sm:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Farmers Love AI Farmer</h2>
          </div>

          <div className={`relative p-10 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-gray-50 border border-gray-100"}`}>
            {/* Quote mark */}
            <div className={`text-8xl font-serif leading-none mb-4 ${darkMode ? "text-green-900" : "text-green-100"}`}>"</div>
            <p className={`text-xl leading-relaxed mb-8 -mt-8 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              {testimonials[activeT].quote}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                {testimonials[activeT].avatar}
              </div>
              <div>
                <p className={`font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{testimonials[activeT].name}</p>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{testimonials[activeT].role} · {testimonials[activeT].location}</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveT(i)}
                    className={`rounded-full transition-all ${i === activeT ? "w-6 h-2 bg-green-500" : `w-2 h-2 ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center 60%", filter: "brightness(0.25)" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-emerald-900/60" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold mb-8 backdrop-blur-sm">
            🌿 Join thousands of smart farmers
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Your Farm Deserves<br />the Power of AI
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Free forever. No credit card. Start making data-driven farming decisions today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/signup")}
              className="px-10 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full text-base transition-all hover:shadow-2xl hover:shadow-green-500/40 hover:-translate-y-1">
              🌱 Create Free Account
            </button>
            <button onClick={() => navigate("/signin")}
              className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full text-base hover:bg-white/20 transition-all">
              Sign In →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
