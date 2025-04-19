"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, X, Check } from "lucide-react";
import { useStore } from "@/utils/zustand/useStore";
import CheckoutButton from "@/components/CheckoutButton";

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

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);

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

  const updateQuantity = (id, change) => {
    // Copia dell'item corrente
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, (item.quantity || 1) + change);
    const oldQuantity = item.quantity || 1;

    // Rimuovi l'item e reinseriscilo aggiornato
    removeFromCart(id);
    useStore.getState().addToCart({ ...item, quantity: newQuantity });

    // Show toast notification
    if (change > 0) {
      showToast(
        `Quantità di ${item.name} aumentata a ${newQuantity}`,
        "success"
      );
    } else if (change < 0 && newQuantity < oldQuantity) {
      showToast(
        `Quantità di ${item.name} diminuita a ${newQuantity}`,
        "success"
      );
    }
  };

  const handleRemoveFromCart = (id) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    removeFromCart(id);
    showToast(`${item.name} rimosso dal carrello`, "success");
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const shipping = "Free";
  const postage = 8.0;
  const total = subtotal + postage;

  const formatPrice = (price) => {
    return `${price.toFixed(2).replace(".", ",")}€`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast notification */}
      <Toast
        isVisible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 py-12">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 text-center font-playfair">
          SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <ShoppingBag size={64} className="text-gray-300" />
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Il carrello è vuoto.
                </p>
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 bg-black text-white font-medium"
                  >
                    Continua lo Shopping
                  </motion.button>
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.id}
                  className="border-b border-gray-200 pb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                        {item.name}
                      </h2>
                      <p className="text-xl mb-4">{formatPrice(item.price)}</p>

                      <div className="flex gap-6 mb-4">
                        <div>
                          <p className="text-sm font-medium mb-1">SIZE</p>
                          <p className="text-sm">{item.size}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">COLOR</p>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
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

                      <div className="flex items-center gap-4 mb-4">
                        <motion.button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                          whileTap={{ scale: 0.9 }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </motion.button>
                        <span className="text-xl font-medium w-8 text-center">
                          {item.quantity || 1}
                        </span>
                        <motion.button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                          whileTap={{ scale: 0.9 }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>

                      <motion.button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-sm text-red-500 flex items-center gap-1 mt-2 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 size={14} />
                        <span>Rimuovi</span>
                      </motion.button>
                    </div>

                    <div className="md:w-1/3 flex justify-center">
                      <div className="relative w-[150px] h-[200px]">
                        <Image
                          src={
                            item.image_url ||
                            "/placeholder.svg?height=200&width=150"
                          }
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="border border-gray-300 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6 text-center">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <p className="font-medium uppercase">SUBTOTAL</p>
                  <p>{formatPrice(subtotal)}</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-medium uppercase">SHIPPING</p>
                  <p>{shipping}</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-medium uppercase">POSTAGE</p>
                  <p>{formatPrice(postage)}</p>
                </div>

                <div className="border-t border-gray-300 pt-4 flex justify-between">
                  <p className="font-medium uppercase">TOTAL</p>
                  <p className="font-bold">{formatPrice(total)}</p>
                </div>
              </div>

              <CheckoutButton />

              {cart.length > 0 && (
                <Link href="/products">
                  <motion.button
                    className="w-full mt-4 py-3 bg-transparent text-gray-600 font-medium hover:text-black transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continua lo Shopping
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
