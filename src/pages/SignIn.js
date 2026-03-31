import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function SignIn({ darkMode }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
    } catch (err) {
      console.error("Sign in error:", err.code, err.message);
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;
        default:
          setError(`Sign in failed: ${err.code || err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      darkMode ? "bg-gray-950" : "bg-gradient-to-br from-green-50 via-white to-emerald-50"
    }`}>
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />

      <div className={`relative w-full max-w-md eco-card p-8 ${darkMode ? "bg-gray-800/80" : ""}`}>
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            🌿
          </div>
          <h2 className="section-title text-2xl mb-1">Welcome Back</h2>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Sign in to your AI Crop Advisory account
          </p>
        </div>

        {error && (
          <div className={`mb-4 p-3 rounded-xl text-sm text-center ${
            darkMode ? "bg-red-900/40 text-red-300" : "bg-red-50 text-red-600"
          }`}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-semibold mb-1 ${darkMode ? "text-green-300" : "text-green-800"}`}>
              ✉️ Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={handleChange}
              className="eco-input"
            />
          </div>
          <div>
            <label className={`block text-xs font-semibold mb-1 ${darkMode ? "text-green-300" : "text-green-800"}`}>
              🔒 Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={form.password}
              onChange={handleChange}
              className="eco-input"
            />
          </div>
          <button type="submit" className="btn-eco w-full py-3 text-sm mt-2" disabled={loading}>
            {loading ? "🌱 Signing in..." : "🌾 Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className={`flex-1 h-px ${darkMode ? "bg-gray-700" : "bg-green-100"}`} />
          <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>or</span>
          <div className={`flex-1 h-px ${darkMode ? "bg-gray-700" : "bg-green-100"}`} />
        </div>

        <p className={`text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Don't have an account?{" "}
          <Link to="/signup" className={`font-semibold ${darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`}>
            Sign Up
          </Link>
        </p>
        <p className="text-center mt-3">
          <Link to="/" className={`text-xs ${darkMode ? "text-gray-500 hover:text-gray-400" : "text-gray-400 hover:text-gray-500"}`}>
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
