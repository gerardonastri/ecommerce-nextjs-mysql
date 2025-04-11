"use client"

import { useState } from "react"
import ProductFilters from "./product-filters"
import Card from "@/components/Card"

export default function ListItems() {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [viewMode, setViewMode] = useState("grid")

  // Format price with euro symbol
  const formatPrice = (price) => {
    return `${price.toFixed(2).replace(".", ",")}€`
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {/* Filters and Sorting */}
      <ProductFilters onProductsChange={setFilteredProducts} />

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">No products found</h2>
          <p className="text-gray-600 mb-8">Try adjusting your filters to find what you're looking for.</p>
        </div>
      ) : (
        <div
          className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"} gap-6`}
        >
          {filteredProducts.map((product) => (
            // <div key={product.id} className={`border border-gray-200 p-4 ${viewMode === "list" ? "flex gap-6" : ""}`}>
            //   <div className={`${viewMode === "list" ? "w-1/3" : "w-full"} aspect-[3/4] bg-gray-100 mb-4 relative`}>
            //     {/* Placeholder for product image */}
            //     <div className="absolute inset-0 flex items-center justify-center text-gray-400">Product Image</div>

            //     {/* Sale or New tag */}
            //     {product.isSale && (
            //       <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1">SALE</div>
            //     )}
            //     {product.isNew && (
            //       <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">NEW</div>
            //     )}
            //   </div>

            //   <div className={viewMode === "list" ? "w-2/3" : ""}>
            //     <h3 className="font-medium mb-1">{product.name}</h3>
            //     <p className="text-lg mb-2">{formatPrice(product.price)}</p>

            //     <div className="flex gap-2 mb-2">
            //       <div className="text-xs text-gray-600 capitalize">{product.category}</div>
            //       <div className="text-xs text-gray-600 capitalize">{product.color}</div>
            //     </div>

            //     <div className="flex gap-1">
            //       {product.size.map((size) => (
            //         <span key={size} className="text-xs border border-gray-300 px-1.5 py-0.5">
            //           {size}
            //         </span>
            //       ))}
            //     </div>
            //   </div>
            // </div>
            <Card item={product } key={product.name} />
          ))}
        </div>
      )}
    </div>
  )
}
