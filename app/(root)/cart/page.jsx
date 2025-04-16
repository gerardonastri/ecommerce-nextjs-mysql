"use client";

import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/utils/zustand/useStore";

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const updateQuantity = (id, change) => {
    // Copia dell'item corrente
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, (item.quantity || 1) + change);

    // Rimuovi l'item e reinseriscilo aggiornato
    removeFromCart(id);
    useStore.getState().addToCart({ ...item, quantity: newQuantity });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const shipping = "Free";
  const postage = 24.0;
  const total = subtotal + postage;

  const formatPrice = (price) => {
    return `${price.toFixed(2).replace(".", ",")}€`;
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 py-12">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 text-center font-playfair">
          SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {cart.length === 0 ? (
              <p className="text-lg text-gray-600 text-center">Il carrello è vuoto.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="border-b border-gray-200 pb-8">
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
                          <p className="text-sm">{item.color}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-xl font-medium"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-xl">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-xl font-medium"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-500 underline mt-2 cursor-pointer"
                      >
                        Rimuovi
                      </button>
                    </div>

                    <div className="md:w-1/3 flex justify-center">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        width={150}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-300 p-6">
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
                  <p>{formatPrice(total)}</p>
                </div>
              </div>

              <button className="w-full py-3 bg-white border border-black text-black font-medium hover:bg-black hover:text-white transition-colors duration-300">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
