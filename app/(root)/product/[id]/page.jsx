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

export default function ProductDetail() {
  const addToCart = useStore((state) => state.addToCart);
  const addToWishlist = useStore((state) => state.addToWishlist);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("royal-brown");
  const [selectedSize, setSelectedSize] = useState("8");

  // Product images
  const productImages = [
    "/products/img-1.avif",
    "/products/img-2.avif",
    "/products/img-3.avif",
    "/products/img-4.avif",
    "/products/img-5.avif",
  ];

  // Color options
  const colorOptions = [
    { id: "royal-brown", name: "Royal Brown", hex: "#6B4C35" },
    { id: "light-grey", name: "Light Grey", hex: "#D9D9D9" },
    { id: "navy-blue", name: "Navy Blue", hex: "#2B4D6F" },
    { id: "black", name: "Black", hex: "#1A1A1A" },
  ];

  // Size options
  const sizeOptions = ["6", "8", "10", "14", "18", "20"];

  // Related products
  const relatedProducts = [
    {
      id: 1,
      name: "Slim Fit T-Shirt",
      price: 18.0,
      image: "/products/img-1.avif",
    },
    {
      id: 2,
      name: "Hooded Sweatshirt",
      price: 35.0,
      image: "/products/img-2.avif",
    },
    {
      id: 3,
      name: "Linen Blend Shirt",
      price: 32.0,
      image: "/products/img-3.avif",
    },
    {
      id: 4,
      name: "Denim Jacket",
      price: 65.0,
      image: "/products/img-4.avif",
    },
  ];

  // Format price
  const formatPrice = (price) => {
    return `£${price.toFixed(2)}`;
  };

  // Navigate through product images
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
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8 text-gray-500">
        <Link href="/" className="hover:text-black">
          Homepage
        </Link>
        <span className="mx-2">/</span>
        <Link href="/women" className="hover:text-black">
          Women
        </Link>
        <span className="mx-2">/</span>
        <Link href="/women/shirts-tops" className="hover:text-black">
          Women's Shirts & Tops
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black">Long Sleeve Overshirt, Khaki, 6</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="relative aspect-[3/4] mb-4">
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt="Long Sleeve Overshirt"
              fill
              className="object-cover"
              priority
            />

            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Share button */}
            <button
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm"
              aria-label="Share product"
            >
              <Share2 size={18} />
            </button>

            {/* Wishlist button */}
            <button
              className="absolute top-16 right-4 bg-white rounded-full p-2 shadow-sm"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
          </div>

          {/* Thumbnail images */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
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
                  src={image || "/placeholder.svg"}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-1">JohnLewis ANYDAY</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Long Sleeve Overshirt, Khaki, 6
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <span className="text-gray-500 line-through text-sm mr-2">
                  £40.00
                </span>
                <span className="text-xl font-bold">£28.00</span>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex">
                  <Star size={16} fill="#000" stroke="none" />
                  <Star size={16} fill="#000" stroke="none" />
                  <Star size={16} fill="#000" stroke="none" />
                  <Star size={16} fill="#000" stroke="none" />
                  <StarHalf size={16} fill="#000" stroke="none" />
                </div>
                <span className="text-sm">4.5</span>
                <span className="text-sm text-gray-500">(1,238 Sold)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="font-bold mb-2">Description:</h2>
            <p className="text-sm text-gray-700 mb-2">
              Quis enim ut duis harum est patus effectus a singulari
              conventione. Quam quid compositio sequitur ut sanctum ut pars in
              articulo. Boba reflect an plass in articulos tapiocos in funco
              patus bweezes, quae typica ignis feu nigris sequitur Boba
              phenomenons.
            </p>
            <button className="text-sm font-medium underline">
              See More...
            </button>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
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

          {/* Size Selection */}
          <div className="mb-8">
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
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart and Checkout */}
          <div className="flex gap-4 mb-6">
            <button className="cursor-pointer flex-1 bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors">
              Add To Cart
            </button>
            <button className="flex-1 border border-gray-300 py-3 font-medium hover:bg-gray-50 transition-colors">
              Checkout Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="text-sm text-gray-600">
            <p>Delivery: T&C</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Related Product</h2>
          <Link href="#" className="text-sm underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] mb-3 bg-gray-100 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium mb-1">{product.name}</h3>
              <p>{formatPrice(product.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
