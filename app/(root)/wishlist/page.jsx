"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, X, Check, Trash2 } from "lucide-react";
import { useStore } from "@/utils/zustand/useStore";

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
              <X size={18} className="text-white" />
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

export default function WishlistPage() {
  // Use Zustand store for wishlist and cart
  const wishlist = useStore((state) => state.wishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const addToCart = useStore((state) => state.addToCart);

  // Toast state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });

    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const handleRemoveFromWishlist = (id) => {
    const item = wishlist.find((item) => item.id === id);
    if (!item) return;

    removeFromWishlist(id);
    showToast(`${item.name} rimosso dalla wishlist`, "success");
  };

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      quantity: 1,
    });
    showToast(`${item.name} aggiunto al carrello`, "success");
  };

  // Format price with euro symbol
  const formatPrice = (price) => {
    return `${price.toFixed(2).replace(".", ",")}€`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white py-12">
      {/* Toast notification */}
      <Toast
        isVisible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-black tracking-tighter mb-12 text-center font-playfair"
        >
          WISHLIST
        </motion.h1>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold mb-4">La tua wishlist è vuota</h2>
            <p className="text-gray-600 mb-8">
              Esplora le nostre collezioni e aggiungi i tuoi articoli preferiti
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Esplora Collezioni
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                  layout
                  className="relative group"
                >
                  <div className="mb-4 relative aspect-[3/4] bg-gray-100 overflow-hidden">
                    <Image
                      src={
                        item.image_url ||
                        "/placeholder.svg?height=600&width=450"
                      }
                      alt={item.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Remove button */}
                    <motion.button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </motion.button>
                  </div>

                  <h2 className="text-xl font-bold tracking-tight mb-2">
                    {item.name}
                  </h2>
                  <p className="text-lg mb-3">{formatPrice(item.price)}</p>

                  <div className="flex gap-6 mb-4">
                    <div>
                      <p className="text-xs font-medium mb-1">SIZE</p>
                      <p className="text-sm">{item.size}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1">COLOR</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              typeof item.color === "object"
                                ? item.color.hex
                                : "#999",
                          }}
                        />
                        <p className="text-sm">
                          {typeof item.color === "object"
                            ? item.color.name
                            : item.color}
                        </p>
                      </div>
                    </div>
                  </div>

                  {item.available !== false ? (
                    <motion.button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2.5 flex items-center justify-center gap-2 bg-white border border-black text-black font-medium hover:bg-black hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Aggiungi al Carrello</span>
                    </motion.button>
                  ) : (
                    <button className="w-full py-2.5 bg-gray-100 text-gray-500 font-medium cursor-not-allowed">
                      Esaurito
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Visualizza Carrello
              </motion.button>
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  );
}
