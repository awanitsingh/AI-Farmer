import React, { useState } from "react";
import abiram from "./img/Awanit.jpg";

function ContactModal({ isOpen, onClose, darkMode }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens default mail client with prefilled content
    const mailto = `mailto:awanitsingh8873@gmail.com?subject=Message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const card = darkMode ? "bg-gray-800 border border-green-900" : "bg-white border border-green-100";
  const text  = darkMode ? "text-green-100" : "text-gray-800";
  const sub   = darkMode ? "text-gray-400"  : "text-gray-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-green-50 via-white to-emerald-50"
      }`}>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-green-100 hover:bg-green-200 text-gray-600"
          }`}
        >
          ✕
        </button>

        <div className="p-8 md:p-12">

          {/* Header */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
              darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
            }`}>
              🌿 Let's Connect
            </div>
            <h2 className="section-title mb-2">Get In Touch</h2>
            <p className={`text-sm max-w-md mx-auto ${sub}`}>
              Have questions about the AI Farmer? Reach out for support, collaboration, or just to say hello.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Left — Profile */}
            <div className="flex flex-col gap-6">
              {/* Profile card */}
              <div className={`rounded-2xl p-6 flex flex-col items-center text-center ${card}`}>
                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 blur-md opacity-30 scale-110" />
                  <img
                    src={abiram}
                    alt="Awanit Kumar Singh"
                    className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <h3 className={`text-xl font-bold mb-1 ${text}`}>Awanit Kumar Singh</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium mb-3 ${
                  darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
                }`}>
                  Full Stack Developer
                </span>
                <p className={`text-xs leading-relaxed mb-4 ${sub}`}>
                  Final Year CSE student at Lovely Professional University, passionate about agricultural technology and AI-driven solutions.
                </p>

                {/* Contact links */}
                <div className="w-full space-y-2">
                  {[
                    { icon: "✉️", label: "awanitsingh8873@gmail.com", href: "mailto:awanitsingh8873@gmail.com" },
                    { icon: "📞", label: "+91 7061879429", href: "tel:+917061879429" },
                    { icon: "📍", label: "LPU, Punjab, India", href: null },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${
                      darkMode ? "bg-gray-700/50" : "bg-green-50"
                    }`}>
                      <span>{item.icon}</span>
                      {item.href
                        ? <a href={item.href} className={`hover:underline ${darkMode ? "text-green-300" : "text-green-700"}`}>{item.label}</a>
                        : <span className={sub}>{item.label}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className={`rounded-2xl p-5 ${card}`}>
                <p className={`text-xs font-semibold mb-3 ${darkMode ? "text-green-400" : "text-green-700"}`}>
                  🔗 Find me on
                </p>
                <div className="flex gap-3">
                  {[
                    { label: "GitHub", icon: "🐙", href: "https://github.com/awanitsingh", bg: darkMode ? "bg-gray-700" : "bg-gray-100" },
                    { label: "LinkedIn", icon: "💼", href: "#", bg: darkMode ? "bg-blue-900/40" : "bg-blue-50" },
                    { label: "WhatsApp", icon: "💬", href: "https://wa.me/917061879429", bg: darkMode ? "bg-green-900/40" : "bg-green-50" },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-medium transition-all hover:-translate-y-1 hover:shadow-md ${s.bg} ${text}`}
                    >
                      <span className="text-xl">{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "⏱️", title: "Response Time", desc: "Within 24 hrs" },
                  { icon: "🤝", title: "Open For", desc: "Collaboration" },
                ].map((item, i) => (
                  <div key={i} className={`rounded-xl p-4 text-center ${card}`}>
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className={`text-xs font-semibold ${darkMode ? "text-green-300" : "text-green-700"}`}>{item.title}</div>
                    <div className={`text-xs ${sub}`}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className={`rounded-2xl p-6 ${card}`}>
              <h3 className={`text-lg font-bold mb-1 ${text}`}>Send a Message</h3>
              <p className={`text-xs mb-6 ${sub}`}>Fill the form below and it'll open your mail client.</p>

              {sent && (
                <div className="mb-4 p-3 rounded-xl text-sm bg-green-100 text-green-700 text-center">
                  ✅ Opening your mail client...
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? "text-green-300" : "text-green-800"}`}>
                    👤 Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="eco-input"
                  />
                </div>

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
                    💬 Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="eco-input resize-none"
                  />
                </div>

                <button type="submit" className="btn-eco w-full py-3 text-sm">
                  🌿 Send Message
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className={`flex-1 h-px ${darkMode ? "bg-gray-700" : "bg-green-100"}`} />
                <span className={`text-xs ${sub}`}>or reach directly</span>
                <div className={`flex-1 h-px ${darkMode ? "bg-gray-700" : "bg-green-100"}`} />
              </div>

              <a
                href="mailto:awanitsingh8873@gmail.com"
                className="btn-outline-eco w-full py-3 text-sm text-center block"
              >
                ✉️ awanitsingh8873@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
