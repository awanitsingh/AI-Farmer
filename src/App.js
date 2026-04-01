import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Header from "./header";
import Footer from "./footer";
import Landing from "./landing";
import Des from "./des";
import ContactModal from "./ContactModal";
import CropPage from "./pages/CropPage";
import FertilizerPage from "./pages/FertilizerPage";
import DiseasePage from "./pages/DiseasePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/HistoryPage";
import SoilHealth from "./pages/SoilHealth";
import CropCalendar from "./pages/CropCalendar";
import Settings from "./pages/Settings";
import MarketPage from "./pages/MarketPage";
import FuturePredictions from "./pages/FuturePredictions";
import { Analytics } from "@vercel/analytics/react";
import ChatBot from "./components/ChatBot";

export const DarkModeContext = React.createContext();

// Public landing page — visible to everyone
function PublicHome({ darkMode, onContactClick, user }) {
  const navigate = useNavigate();
  return (
    <>
      {/* Public header with Sign In button */}
      <header className={`sticky top-0 z-50 py-4 backdrop-blur-md border-b ${
        darkMode ? "bg-gray-900/95 border-green-900" : "bg-white/95 border-green-100"
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-base shadow-md">🌿</div>
            <span className={`text-base font-bold tracking-tight ${darkMode ? "text-green-400" : "text-green-700"}`}>AI Farmer</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <button onClick={() => navigate("/dashboard")} className="btn-eco text-xs px-4 py-2">
                Go to Dashboard →
              </button>
            ) : (
              <>
                <button onClick={() => navigate("/signin")} className={`text-sm font-medium ${darkMode ? "text-green-400" : "text-green-700"}`}>
                  Sign In
                </button>
                <button onClick={() => navigate("/signup")} className="btn-eco text-xs px-4 py-2">
                  Get Started →
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <Landing darkMode={darkMode} />
      <section id="about" className={darkMode ? "bg-gray-900" : "bg-green-50"}>
        <Des darkMode={darkMode} />
      </section>
      <Footer onContactClick={onContactClick} darkMode={darkMode} />
    </>
  );
}

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSignOut = () => signOut(auth);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🌿</div>
          <p className="text-green-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Protected layout — with header/footer
  const Protected = ({ children }) => user ? children : <SignIn darkMode={darkMode} />;

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <Analytics />
      <BrowserRouter>
        <div className={`flex min-h-screen flex-col leaf-bg ${darkMode ? "dark" : ""}`}>
          <Routes>
            {/* Public landing page */}
            <Route path="/" element={
              <PublicHome darkMode={darkMode} onContactClick={() => setIsContactModalOpen(true)} user={user} />
            } />

            {/* Auth pages */}
            <Route path="/signin" element={<SignIn darkMode={darkMode} />} />
            <Route path="/signup" element={<SignUp darkMode={darkMode} />} />

            {/* Protected pages — all wrapped with header/footer */}
            <Route path="/*" element={
              <Protected>
                <Header onContactClick={() => setIsContactModalOpen(true)} darkMode={darkMode}
                  setDarkMode={setDarkMode} user={user} onSignOut={handleSignOut} />
                <main className="flex-1">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard darkMode={darkMode} user={user} />} />
                    <Route path="/crop"       element={<CropPage darkMode={darkMode} user={user} />} />
                    <Route path="/fertilizer" element={<FertilizerPage darkMode={darkMode} user={user} />} />
                    <Route path="/disease"    element={<DiseasePage darkMode={darkMode} user={user} />} />
                    <Route path="/history"    element={<HistoryPage darkMode={darkMode} user={user} />} />
                    <Route path="/soil"       element={<SoilHealth darkMode={darkMode} user={user} />} />
                    <Route path="/calendar"   element={<CropCalendar darkMode={darkMode} />} />
                    <Route path="/settings"   element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} user={user} />} />
                    <Route path="/market"     element={<MarketPage darkMode={darkMode} />} />
                    <Route path="/future"     element={<FuturePredictions darkMode={darkMode} />} />
                  </Routes>
                </main>
                <Footer onContactClick={() => setIsContactModalOpen(true)} darkMode={darkMode} />
                <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} darkMode={darkMode} />
                <ChatBot darkMode={darkMode} />
              </Protected>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </DarkModeContext.Provider>
  );
}

export default App;
