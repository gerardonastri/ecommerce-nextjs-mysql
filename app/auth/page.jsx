"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import { signIn } from "next-auth/react";

// Toast component
const Toast = ({ isVisible, message, type = "success", onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed top-6 left-1/2 z-50 transform -translate-x-1/2 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg"
          style={{
            backgroundColor: type === "success" ? "#10B981" : "#EF4444",
            color: "white",
            maxWidth: "calc(100% - 32px)",
          }}
        >
          <div className="flex items-center gap-2">
            {type === "success" ? (
              <Check size={18} className="text-white" />
            ) : (
              <AlertCircle size={18} className="text-white" />
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close notification"
          >
            <X size={16} className="text-white" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Toast state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  // const supabase = createClientComponentClient();

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });

    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  // const handleEmailAuth = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     if (isLogin) {
  //       // Login with email
  //       const { error } = await supabase.auth.signInWithPassword({
  //         email,
  //         password,
  //       });

  //       if (error) throw error;

  //       showToast("Login effettuato con successo!", "success");
  //     } else {
  //       // Register with email
  //       const { error } = await supabase.auth.signUp({
  //         email,
  //         password,
  //         options: {
  //           data: {
  //             full_name: name,
  //           },
  //         },
  //       });

  //       if (error) throw error;

  //       showToast(
  //         "Registrazione completata! Controlla la tua email per confermare.",
  //         "success"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Authentication error:", error);
  //     showToast(
  //       error.message || "Si è verificato un errore durante l'autenticazione",
  //       "error"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGoogleAuth = async () => {
  //   setLoading(true);

  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //       options: {
  //         redirectTo: `${window.location.origin}/auth/callback`,
  //       },
  //     });

  //     if (error) throw error;
  //   } catch (error) {
  //     console.error("Google auth error:", error);
  //     showToast(
  //       error.message ||
  //         "Si è verificato un errore durante l'autenticazione con Google",
  //       "error"
  //     );
  //     setLoading(false);
  //   }
  // };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Reset form fields when switching modes
    setPassword("");
    if (isLogin) {
      setName("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-12">
      {/* Toast notification */}
      <Toast
        isVisible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <div className="flex justify-center mb-6">
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900">
              {isLogin ? "Accedi al tuo account" : "Crea un nuovo account"}
            </h1>
            <p className="mt-2 text-center text-gray-600 text-sm">
              {isLogin
                ? "Inserisci le tue credenziali per accedere"
                : "Inserisci i tuoi dati per registrarti"}
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={() => signIn("email")} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-1">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nome completo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required={!isLogin}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                          placeholder="Il tuo nome completo"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    placeholder="La tua email"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  {isLogin && (
                    <Link
                      href="/reset-password"
                      className="text-xs font-medium text-black hover:underline"
                    >
                      Password dimenticata?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    placeholder={
                      isLogin ? "La tua password" : "Crea una password"
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    ) : (
                      <Eye
                        size={18}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    {isLogin ? "Accedi" : "Registrati"}
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Oppure continua con
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  type="button"
                  onClick={() => signIn("google")}
                  disabled={loading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Continua con Google
                </motion.button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Non hai un account?" : "Hai già un account?"}{" "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="font-medium text-black hover:underline focus:outline-none"
              >
                {isLogin ? "Registrati" : "Accedi"}
              </button>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          Accedendo, accetti i nostri{" "}
          <Link
            href="/terms"
            className="font-medium text-black hover:underline"
          >
            Termini di Servizio
          </Link>{" "}
          e{" "}
          <Link
            href="/privacy"
            className="font-medium text-black hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}
