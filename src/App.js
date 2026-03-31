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

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => signOut(auth);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <Analytics />
      <BrowserRouter>
        <div className={`flex min-h-screen flex-col leaf-bg ${darkMode ? "dark" : ""}`}>
          <Header
            onContactClick={() => setIsContactModalOpen(true)}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            user={user}
            onSignOut={handleSignOut}
          />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage darkMode={darkMode} onContactClick={() => setIsContactModalOpen(true)} />} />
              <Route path="/crop" element={<CropPage darkMode={darkMode} />} />
              <Route path="/fertilizer" element={<FertilizerPage darkMode={darkMode} />} />
              <Route path="/disease" element={<DiseasePage darkMode={darkMode} />} />
              <Route path="/signin" element={<SignIn darkMode={darkMode} />} />
              <Route path="/signup" element={<SignUp darkMode={darkMode} />} />
            </Routes>
          </main>
          <Footer onContactClick={() => setIsContactModalOpen(true)} darkMode={darkMode} />
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
            darkMode={darkMode}
          />
        </div>
      </BrowserRouter>
    </DarkModeContext.Provider>
  );
}

export default App;
