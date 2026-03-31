import { useNavigate, Link } from "react-router-dom";

function Header({ onContactClick, darkMode, setDarkMode, user, onSignOut }) {
  const navigate = useNavigate();
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

          {/* Dark Mode Toggle + Auth */}
          <div className="flex items-center gap-3">
            <span className="text-sm hidden sm:block">{darkMode ? "🌙" : "☀️"}</span>
            <button
              className={`dark-toggle ${darkMode ? "active" : ""}`}
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            />
            {user ? (
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  darkMode ? "bg-green-800 text-green-300" : "bg-green-100 text-green-700"
                }`}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <button onClick={onSignOut} className={`text-xs font-medium hidden sm:block ${
                  darkMode ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-500"
                }`}>
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/signin" className="btn-eco text-xs px-4 py-2 no-underline">
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
