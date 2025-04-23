"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };

  const acceptEssentialOnly = () => {
    localStorage.setItem("cookiesAccepted", "essential");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">Utilizziamo i cookie</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Questo sito utilizza cookie tecnici necessari al funzionamento
                  e cookie analitici e di profilazione, anche di terze parti,
                  per migliorare la tua esperienza e offrire servizi in linea
                  con le tue preferenze.
                </p>
                <p className="text-sm text-gray-600">
                  Per saperne di più, consulta la nostra{" "}
                  <Link
                    href="/cookie"
                    className="text-black underline hover:no-underline"
                  >
                    Cookie Policy
                  </Link>{" "}
                  e{" "}
                  <Link
                    href="/privacy"
                    className="text-black underline hover:no-underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-0">
                <button
                  onClick={acceptEssentialOnly}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium text-sm rounded-md hover:bg-gray-50 transition-colors"
                >
                  Solo essenziali
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-4 py-2 bg-black text-white font-medium text-sm rounded-md hover:bg-gray-800 transition-colors"
                >
                  Accetta tutti
                </button>
              </div>
              <button
                onClick={acceptEssentialOnly}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Chiudi"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
