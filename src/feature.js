function Feature({ darkMode }) {
  const features = [
    {
      icon: "🌾",
      tag: "AI Model 1",
      title: "Crop Recommendation",
      desc: "Input soil nutrients (N, P, K), temperature, humidity, pH, and rainfall to get the most suitable crop for your field using our trained ML model.",
      href: "#croprecommender",
      color: darkMode ? "from-green-900/60 to-emerald-900/40" : "from-green-50 to-emerald-100",
      border: darkMode ? "border-green-800" : "border-green-200",
    },
    {
      icon: "💧",
      tag: "AI Model 2",
      title: "Fertilizer Recommendation",
      desc: "Provide soil type, crop type, and nutrient levels to receive precise fertilizer recommendations that maximize yield and minimize waste.",
      href: "#fertilizer",
      color: darkMode ? "from-teal-900/60 to-green-900/40" : "from-teal-50 to-green-100",
      border: darkMode ? "border-teal-800" : "border-teal-200",
    },
    {
      icon: "🔬",
      tag: "AI Model 3",
      title: "Disease Detection",
      desc: "Upload a photo of your plant leaf and our deep learning model will identify diseases and suggest the right treatment.",
      href: "#plantdisease",
      color: darkMode ? "from-emerald-900/60 to-teal-900/40" : "from-emerald-50 to-teal-100",
      border: darkMode ? "border-emerald-800" : "border-emerald-200",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
          darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
        }`}>
          🤖 Powered by Machine Learning
        </div>
        <h2 className="section-title mb-3">Our AI Features</h2>
        <p className={`max-w-xl mx-auto text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Three intelligent models working together to give farmers the best data-driven advice for sustainable agriculture.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className={`relative rounded-2xl border p-6 bg-gradient-to-br ${f.color} ${f.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col`}>
            {f.badge && (
              <span className={`absolute top-4 right-4 text-xs px-2 py-1 rounded-full font-medium ${
                darkMode ? "bg-yellow-900/50 text-yellow-300" : "bg-yellow-100 text-yellow-700"
              }`}>
                {f.badge}
              </span>
            )}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 ${
              darkMode ? "bg-green-900/50" : "bg-white shadow-sm"
            }`}>
              {f.icon}
            </div>
            <span className={`text-xs font-semibold mb-2 ${darkMode ? "text-green-400" : "text-green-600"}`}>
              {f.tag}
            </span>
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-green-200" : "text-gray-800"}`}>
              {f.title}
            </h3>
            <p className={`text-sm leading-relaxed flex-1 mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {f.desc}
            </p>
            <a href={f.href} className="btn-eco text-sm text-center no-underline inline-block">
              Try Now →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;
