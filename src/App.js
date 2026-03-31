import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Header from "./header";
import Footer from "./footer";
import Landing from "./landing";
import Des from "./des";
import ContactModal from "./ContactModal";
import Features from "./Features";
import CropPage from "./pages/CropPage";
import FertilizerPage from "./pages/FertilizerPage";
import DiseasePage from "./pages/DiseasePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Analytics } from "@vercel/analytics/react";

export const DarkModeContext = React.createContext();

function HomePage({ darkMode, onContactClick }) {
  return (
    <>
      <Landing darkMode={darkMode} />
      <section id="about" className={darkMode ? "bg-gray-900" : "bg-green-50"}>
        <Des darkMode={darkMode} />
      </section>
      <section id="features" className={darkMode ? "bg-gray-950" : "bg-white"}>
        <Features darkMode={darkMode} />
      </section>
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

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <Analytics />
      <BrowserRouter>
        <div className={`flex min-h-screen flex-col leaf-bg ${darkMode ? "dark" : ""}`}>
          {user && (
            <Header
              onContactClick={() => setIsContactModalOpen(true)}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              user={user}
              onSignOut={handleSignOut}
            />
          )}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={user ? <HomePage darkMode={darkMode} onContactClick={() => setIsContactModalOpen(true)} /> : <SignIn darkMode={darkMode} />} />
              <Route path="/signin" element={<SignIn darkMode={darkMode} />} />
              <Route path="/signup" element={<SignUp darkMode={darkMode} />} />
              <Route path="/crop" element={user ? <CropPage darkMode={darkMode} /> : <SignIn darkMode={darkMode} />} />
              <Route path="/fertilizer" element={user ? <FertilizerPage darkMode={darkMode} /> : <SignIn darkMode={darkMode} />} />
              <Route path="/disease" element={user ? <DiseasePage darkMode={darkMode} /> : <SignIn darkMode={darkMode} />} />
            </Routes>
          </main>
          {user && (
            <>
              <Footer onContactClick={() => setIsContactModalOpen(true)} darkMode={darkMode} />
              <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                darkMode={darkMode}
              />
            </>
          )}
        </div>
      </BrowserRouter>
    </DarkModeContext.Provider>
  );
}

export default App;
