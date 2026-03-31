function Landing({ darkMode }) {
  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      darkMode ? "bg-gray-950" : "bg-gradient-to-br from-green-50 via-white to-emerald-50"
    }`}>
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 float-anim" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-anim" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center fade-in-up">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${
          darkMode ? "bg-green-900/50 text-green-300 border border-green-700" : "bg-green-100 text-green-700 border border-green-200"
        }`}>
          <span>🌱</span>
          <span>AI-Powered Sustainable Farming</span>
        </div>

        {/* Headline */}
        <h1 className={`font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${
          darkMode ? "text-green-100" : "text-gray-900"
        }`}>
          Agriculture{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
              Made Smart
            </span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-green-200 opacity-50 rounded-full -z-0" />
          </span>
          <br />
          with Machine Learning
        </h1>

        <p className={`mx-auto max-w-2xl text-lg leading-relaxed mb-10 ${
          darkMode ? "text-green-300" : "text-gray-600"
        }`}>
          AI Farmer harnesses the power of machine learning to provide intelligent crop recommendations,
          fertilizer suggestions, and plant disease detection — empowering farmers for a greener future.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#features" className="btn-eco text-base no-underline">
            🌾 Explore Features
          </a>
          <a
            href="https://github.com/awanitsingh/AI-Based-Integrated-Crop-Advisory-System"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-eco text-base no-underline"
          >
            View Source Code
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { icon: "🌿", value: "3", label: "AI Models" },
            { icon: "🌾", value: "22+", label: "Crop Types" },
            { icon: "🔬", value: "99%", label: "Accuracy" },
          ].map((stat, i) => (
            <div key={i} className={`eco-card p-4 text-center`}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                {stat.value}
              </div>
              <div className={`text-xs ${darkMode ? "text-green-400/70" : "text-gray-500"}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
