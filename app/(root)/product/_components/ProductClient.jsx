"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  StarHalf,
} from "lucide-react";
import { useStore } from "@/utils/zustand/useStore";

export default function ProductClient({
  product,
  productImages,
  colorOptions,
  sizeOptions,
}) {
  const addToCart = useStore((state) => state.addToCart);
  const addToWishlist = useStore((state) => state.addToWishlist);

  const handleAddToCart = () => {
    
    addToCart({
      ...product,
      color: selectedColor,
      size: selectedSize,
    })
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].id);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);

  const formatPrice = (price) => `£${price.toFixed(2)}`;

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Galleria Immagini */}
        <div>
          <div className="relative aspect-[3/4] mb-4">
            <Image
              src={productImages[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronRight size={20} />
            </button>
            <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm">
              <Share2 size={18} />
            </button>
            <button className="absolute top-16 right-4 bg-white rounded-full p-2 shadow-sm">
              <Heart size={18} />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 flex-shrink-0 border-2 ${
                  selectedImage === index
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Dettagli prodotto */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xl font-bold">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-1">
              <Star fill="#000" size={16} stroke="none" />
              <Star fill="#000" size={16} stroke="none" />
              <Star fill="#000" size={16} stroke="none" />
              <Star fill="#000" size={16} stroke="none" />
              <StarHalf fill="#000" size={16} stroke="none" />
              <span className="text-sm text-gray-500">(1,238 Sold)</span>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-6">
            {product.description || "No description provided."}
          </p>

          {/* Color */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">Color:</h2>
              <span className="text-sm">
                {colorOptions.find((c) => c.id === selectedColor)?.name}
              </span>
            </div>
            <div className="flex gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`w-10 h-10 rounded-sm ${
                    selectedColor === color.id
                      ? "ring-2 ring-offset-2 ring-black"
                      : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">Size:</h2>
              <span className="text-sm">{selectedSize}</span>
              <Link href="#" className="text-sm underline">
                View Size Chart
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 border ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors !cursor-pointer"
            >
              Add To Cart
            </button>
            <button className="flex-1 border border-gray-300 py-3 font-medium hover:bg-gray-50 transition-colors">
              Checkout Now
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Delivery: Free shipping over £50
          </p>
        </div>
      </div>
    </>
  );
}
