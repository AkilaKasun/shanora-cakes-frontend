import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { conversation, prices } from "./conversation";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(null);
  const [step, setStep] = useState("start");

  const [selection, setSelection] = useState({
    cake: "",
    details: "",
    price: ""
  });

  const handleOption = (opt) => {
    const newSelection = { ...selection };

    // 1. Set Cake Type and reset previous details
    if (step === "cake_type") {
      newSelection.cake = opt.label;
      newSelection.details = "";
    } 
    // 2. Accumulate details (Flavors, Icing, Sizes) before hitting 'final' or actions
    else if (!opt.action && opt.next !== "start" && opt.next !== "cake_type") {
      newSelection.details += (newSelection.details ? " | " : "") + opt.label;
    }

    // 3. Price Calculation when the next step is 'final'
    if (opt.next === "final") {
      const cakePrices = prices[newSelection.cake] || {};
      newSelection.price = cakePrices[opt.label] || "Contact for Price";
    }

    setSelection(newSelection);

    // 4. Handle Step Navigation
    if (opt.next) {
      if (opt.next === "start" || opt.next === "cake_type") {
        setSelection({ cake: "", details: "", price: "" });
      }
      setStep(opt.next);
    }

    // 5. Handle External Actions
    if (opt.action === "GALLERY") {
      document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
    }
    if (opt.action === "ORDER") {
      window.location.href = "/order";
    }
    if (opt.action === "WHATSAPP") {
      window.open("https://wa.me/94722146868", "_blank");
    }
    if (opt.action === "FACEBOOK") {
      window.open("https://www.facebook.com/profile.php?id=61588449220490", "_blank");
    }
    if (opt.action === "INSTAGRAM") {
      window.open("https://www.instagram.com/shanora_cakes/", "_blank");
    }
    if (opt.action === "LINKEDIN") {
      window.open("https://linkedin.com/company/shanoracakes", "_blank");
    }
  };

  const current = lang ? conversation[lang][step] : null;

  const renderMessage = () => {
    if (!current) return null;
    if (step === "final" && current.template) {
      return current.template
        .replace("{cakeName}", selection.cake)
        .replace("{details}", selection.details)
        .replace("{price}", selection.price);
    }
    return current.message;
  };

  return (
    <>
      {/* --- REDESIGNED ATTRACTIVE BUTTON --- */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 group flex items-center justify-center w-16 h-16 bg-shanora-purple text-white rounded-full z-50 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(147,51,234,0.5)]"
      >
        {/* Gentle Pulsing Glow Effect behind the button */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-shanora-purple animate-ping opacity-25"></span>
        )}

        {/* Dynamic SVG Icon (Cross when open, Chat Bubble when closed) */}
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-shanora-purple text-white p-4 font-semibold flex justify-between items-center shrink-0 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Shanora Cakes</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white text-lg transition-colors">
                ✖
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="p-4 space-y-3 overflow-y-auto">
              {!lang && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <p className="text-sm font-medium text-gray-700 text-center mb-4">
                    Select Language / භාෂාව තෝරන්න
                  </p>
                  <button
                    onClick={() => setLang("en")}
                    className="w-full bg-purple-50 text-purple-700 hover:bg-purple-100 hover:shadow-sm p-3 rounded-xl font-medium border border-purple-100 transition-all"
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang("si")}
                    className="w-full bg-purple-50 text-purple-700 hover:bg-purple-100 hover:shadow-sm p-3 rounded-xl font-medium border border-purple-100 transition-all"
                  >
                    සිංහල
                  </button>
                </motion.div>
              )}

              {lang && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="bg-purple-50/50 p-4 rounded-xl text-sm whitespace-pre-line leading-relaxed text-gray-800 border border-purple-50">
                      {renderMessage()}
                    </div>

                    <div className="space-y-2">
                      {current.options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleOption(opt)}
                          className={`w-full text-left p-3 rounded-xl transition-all text-sm font-medium ${
                            opt.action || opt.label.includes("Main Menu") || opt.label.includes("ප්‍රධාන")
                              ? "bg-shanora-purple hover:bg-purple-700 text-white shadow-md text-center"
                              : "bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-100"
                          }`}
                        >
                          {opt.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}