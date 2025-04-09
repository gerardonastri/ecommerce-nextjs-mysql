"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, X } from "lucide-react"

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "CAMILLE HENROT ARTWORK TROUSERS",
      price: 1150.0,
      size: "36",
      color: "WHITE",
      image: "/products/img-1.avif",
      available: true,
    },
    {
      id: 2,
      name: "CAMILLE HENROT ARTWORK SHIRT",
      price: 1250.0,
      size: "36",
      color: "BLACK",
      image: "/products/img-2.avif",
      available: true,
    },
    {
      id: 3,
      name: "CAMILLE HENROT ARTWORK TOP",
      price: 495.0,
      size: "36",
      color: "BLACK",
      image: "/products/img-3.avif",
      available: false,
    },
    {
      id: 4,
      name: "CAMILLE HENROT ARTWORK DRESS",
      price: 1895.0,
      size: "38",
      color: "BLACK",
      image: "/products/img-4.avif",
      available: true,
    },
  ])

  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Format price with euro symbol
  const formatPrice = (price) => {
    return `${price.toFixed(2).replace(".", ",")}€`
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 text-center">WISHLIST</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Browse our collections and add your favorite items</p>
            <Link
              href="/collections"
              className="inline-block px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {wishlistItems.map((item) => (
              <div key={item.id} className="relative group">
                <div className="mb-4 relative aspect-[3/4] bg-gray-100">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                  />

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove from wishlist"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-xl font-bold tracking-tight mb-2">{item.name}</h2>
                <p className="text-lg mb-3">{formatPrice(item.price)}</p>

                <div className="flex gap-6 mb-4">
                  <div>
                    <p className="text-xs font-medium mb-1">SIZE</p>
                    <p className="text-sm">{item.size}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1">COLOR</p>
                    <p className="text-sm">{item.color}</p>
                  </div>
                </div>

                {item.available ? (
                  <button className="w-full py-2.5 flex items-center justify-center gap-2 bg-white border border-black text-black font-medium hover:bg-black hover:text-white transition-colors duration-300">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  <button className="w-full py-2.5 bg-gray-100 text-gray-500 font-medium cursor-not-allowed">
                    Out of Stock
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-16 text-center">
            <Link
              href="/cart"
              className="inline-block px-8 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              View Cart
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
