import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header({ onContactClick, darkMode, setDarkMode, user, onSignOut }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className={`sticky top-0 z-50 py-4 backdrop-blur-md border-b ${
      darkMode
        ? "bg-gray-900/90 border-green-900 text-green-100"
        : "bg-white/90 border-green-100 text-gray-800"
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2 group bg-transparent border-none cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-md">
              <span className="text-white text-lg">🌿</span>
            </div>
            <span className={`text-xl font-bold font-mono tracking-tight ${
              darkMode ? "text-green-400" : "text-green-700"
            }`}>
              AI Crop Advisory
            </span>
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <a href="/#about" className="nav-link text-sm">About</a>
            <a href="/#features" className="nav-link text-sm">Features</a>
            <button onClick={() => navigate("/crop")} className="nav-link text-sm cursor-pointer bg-transparent border-none">Crop</button>
            <button onClick={() => navigate("/fertilizer")} className="nav-link text-sm cursor-pointer bg-transparent border-none">Fertilizer</button>
            <button onClick={() => navigate("/disease")} className="nav-link text-sm cursor-pointer bg-transparent border-none">Disease</button>
            <button onClick={(e) => { e.preventDefault(); onContactClick(); }} className="nav-link text-sm cursor-pointer bg-transparent border-none">Contact</button>
          </div>

          {/* Dark Mode Toggle + User */}
          <div className="flex items-center gap-3">
            <span className="text-sm hidden sm:block">{darkMode ? "🌙" : "☀️"}</span>
            <button
              className={`dark-toggle ${darkMode ? "active" : ""}`}
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            />

            {user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2 px-2 py-1 rounded-xl transition-all ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-green-50"
                  }`}
                >
                  {/* Avatar circle */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-md bg-gradient-to-br from-green-400 to-emerald-600 text-white`}>
                    {initials}
                  </div>
                  {/* Name */}
                  <span className={`text-sm font-medium hidden sm:block max-w-[100px] truncate ${
                    darkMode ? "text-green-300" : "text-green-700"
                  }`}>
                    {displayName}
                  </span>
                  <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-400"}`}>▾</span>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-2xl shadow-xl border py-2 z-50 ${
                    darkMode ? "bg-gray-800 border-green-900" : "bg-white border-green-100"
                  }`}>
                    <div className={`px-4 py-2 border-b ${darkMode ? "border-green-900" : "border-green-50"}`}>
                      <p className={`text-xs font-semibold truncate ${darkMode ? "text-green-300" : "text-green-700"}`}>
                        {displayName}
                      </p>
                      <p className={`text-xs truncate ${darkMode ? "text-gray-400" : "text-gray-400"}`}>
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => { setDropdownOpen(false); onSignOut(); }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                        darkMode ? "text-red-400 hover:bg-gray-700" : "text-red-500 hover:bg-red-50"
                      }`}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
