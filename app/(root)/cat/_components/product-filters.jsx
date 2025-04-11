"use client"

import { useState, useEffect } from "react"
import { ChevronDown, X, Check, Grid, List } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Sample products array
const initialProducts = [
  {
    id: 1,
    name: "Camille Henrot Artwork Trousers",
    price: 1150,
    category: "pants",
    color: "white",
    size: ["XS", "S", "M", "L"],
    isNew: true,
    isSale: false,
  },
  {
    id: 2,
    name: "Camille Henrot Artwork Shirt",
    price: 1250,
    category: "shirts",
    color: "black",
    size: ["S", "M", "L", "XL"],
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Camille Henrot Artwork Top",
    price: 495,
    category: "tops",
    color: "black",
    size: ["XS", "S", "M"],
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "Oversized Cotton Shirt",
    price: 750,
    category: "shirts",
    color: "blue",
    size: ["M", "L", "XL"],
    isNew: false,
    isSale: false,
  },
  {
    id: 5,
    name: "Linen Blend Trousers",
    price: 890,
    category: "pants",
    color: "beige",
    size: ["S", "M", "L"],
    isNew: false,
    isSale: true,
  },
  {
    id: 6,
    name: "Silk Blend Dress",
    price: 1450,
    category: "dresses",
    color: "green",
    size: ["XS", "S", "M", "L"],
    isNew: true,
    isSale: false,
  },
  {
    id: 7,
    name: "Wool Blend Coat",
    price: 1950,
    category: "outerwear",
    color: "camel",
    size: ["S", "M", "L"],
    isNew: false,
    isSale: false,
  },
  {
    id: 8,
    name: "Cashmere Sweater",
    price: 1100,
    category: "knitwear",
    color: "gray",
    size: ["S", "M", "L", "XL"],
    isNew: false,
    isSale: true,
  },
]

const ProductFilters = ({ onProductsChange }) => {
  const [products, setProducts] = useState(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState(initialProducts)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    color: [],
    size: [],
    price: { min: 0, max: 2000 },
    isNew: false,
    isSale: false,
  })
  const [sortOption, setSortOption] = useState("newest")

  // Available filter options
  const filterOptions = {
    category: ["shirts", "pants", "tops", "dresses", "outerwear", "knitwear"],
    color: ["white", "black", "blue", "beige", "green", "camel", "gray"],
    size: ["XS", "S", "M", "L", "XL"],
  }

  // Sort options
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ]

  // Apply filters and sorting
  useEffect(() => {
    let result = [...initialProducts]

    // Apply category filter
    if (activeFilters.category.length > 0) {
      result = result.filter((product) => activeFilters.category.includes(product.category))
    }

    // Apply color filter
    if (activeFilters.color.length > 0) {
      result = result.filter((product) => activeFilters.color.includes(product.color))
    }

    // Apply size filter
    if (activeFilters.size.length > 0) {
      result = result.filter((product) => product.size.some((size) => activeFilters.size.includes(size)))
    }

    // Apply price filter
    result = result.filter(
      (product) => product.price >= activeFilters.price.min && product.price <= activeFilters.price.max,
    )

    // Apply new filter
    if (activeFilters.isNew) {
      result = result.filter((product) => product.isNew)
    }

    // Apply sale filter
    if (activeFilters.isSale) {
      result = result.filter((product) => product.isSale)
    }

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "newest":
      default:
        // Assuming id represents the order of addition (higher id = newer)
        result.sort((a, b) => b.id - a.id)
        break
    }

    setFilteredProducts(result)
    if (onProductsChange) {
      onProductsChange(result)
    }
  }, [activeFilters, sortOption, onProductsChange])

  // Toggle filter for category, color, size
  const toggleFilter = (type, value) => {
    setActiveFilters((prev) => {
      const current = [...prev[type]]
      const index = current.indexOf(value)

      if (index === -1) {
        current.push(value)
      } else {
        current.splice(index, 1)
      }

      return { ...prev, [type]: current }
    })
  }

  // Toggle boolean filters (isNew, isSale)
  const toggleBooleanFilter = (type) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  // Update price range
  const updatePriceRange = (min, max) => {
    setActiveFilters((prev) => ({
      ...prev,
      price: { min, max },
    }))
  }

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      category: [],
      color: [],
      size: [],
      price: { min: 0, max: 2000 },
      isNew: false,
      isSale: false,
    })
  }

  // Count active filters
  const countActiveFilters = () => {
    let count = 0
    count += activeFilters.category.length
    count += activeFilters.color.length
    count += activeFilters.size.length
    if (activeFilters.isNew) count++
    if (activeFilters.isSale) count++
    if (activeFilters.price.min > 0 || activeFilters.price.max < 2000) count++
    return count
  }

  // Format price with euro symbol
  const formatPrice = (price) => {
    return `${price.toFixed(2).replace(".", ",")}€`
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <button
          className={`px-4 py-2 border ${
            isFilterOpen || countActiveFilters() > 0 ? "border-black bg-black text-white" : "border-gray-300"
          } flex items-center gap-2`}
          onClick={() => {
            setIsFilterOpen(!isFilterOpen)
            setIsSortOpen(false)
          }}
        >
          Filter
          {countActiveFilters() > 0 && <span className="ml-1">({countActiveFilters()})</span>}
        </button>

        <div className="flex items-center gap-2">
          <button
            className={`p-2 ${viewMode === "grid" ? "text-black" : "text-gray-400"}`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <Grid size={18} />
          </button>
          <button
            className={`p-2 ${viewMode === "list" ? "text-black" : "text-gray-400"}`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>

        <button
          className={`px-4 py-2 border ${
            isSortOpen ? "border-black bg-black text-white" : "border-gray-300"
          } flex items-center gap-2`}
          onClick={() => {
            setIsSortOpen(!isSortOpen)
            setIsFilterOpen(false)
          }}
        >
          Sort
          <ChevronDown size={16} className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={resetFilters} className="text-sm underline" aria-label="Reset all filters">
                  Reset all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {filterOptions.category.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <div
                          className={`w-4 h-4 border ${
                            activeFilters.category.includes(category) ? "bg-black border-black" : "border-gray-300"
                          } flex items-center justify-center`}
                          onClick={() => toggleFilter("category", category)}
                        >
                          {activeFilters.category.includes(category) && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-sm capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h4 className="font-medium mb-3">Color</h4>
                  <div className="space-y-2">
                    {filterOptions.color.map((color) => (
                      <label key={color} className="flex items-center gap-2 cursor-pointer">
                        <div
                          className={`w-4 h-4 border ${
                            activeFilters.color.includes(color) ? "bg-black border-black" : "border-gray-300"
                          } flex items-center justify-center`}
                          onClick={() => toggleFilter("color", color)}
                        >
                          {activeFilters.color.includes(color) && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-sm capitalize">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="font-medium mb-3">Size</h4>
                  <div className="space-y-2">
                    {filterOptions.size.map((size) => (
                      <label key={size} className="flex items-center gap-2 cursor-pointer">
                        <div
                          className={`w-4 h-4 border ${
                            activeFilters.size.includes(size) ? "bg-black border-black" : "border-gray-300"
                          } flex items-center justify-center`}
                          onClick={() => toggleFilter("size", size)}
                        >
                          {activeFilters.size.includes(size) && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-sm">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price and Other Filters */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="number"
                      min="0"
                      max={activeFilters.price.max}
                      value={activeFilters.price.min}
                      onChange={(e) => updatePriceRange(Number(e.target.value), activeFilters.price.max)}
                      className="w-24 border border-gray-300 p-1 text-sm"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      min={activeFilters.price.min}
                      max="10000"
                      value={activeFilters.price.max}
                      onChange={(e) => updatePriceRange(activeFilters.price.min, Number(e.target.value))}
                      className="w-24 border border-gray-300 p-1 text-sm"
                      placeholder="Max"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={`w-4 h-4 border ${
                          activeFilters.isNew ? "bg-black border-black" : "border-gray-300"
                        } flex items-center justify-center`}
                        onClick={() => toggleBooleanFilter("isNew")}
                      >
                        {activeFilters.isNew && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm">New Arrivals</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={`w-4 h-4 border ${
                          activeFilters.isSale ? "bg-black border-black" : "border-gray-300"
                        } flex items-center justify-center`}
                        onClick={() => toggleBooleanFilter("isSale")}
                      >
                        {activeFilters.isSale && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm">Sale</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => setIsFilterOpen(false)} className="px-6 py-2 border border-gray-300 text-sm">
                  Close
                </button>
                <button onClick={() => setIsFilterOpen(false)} className="px-6 py-2 bg-black text-white text-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sort Panel */}
      <AnimatePresence>
        {isSortOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Sort By</h3>
              <div className="space-y-3">
                {sortOptions.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        sortOption === option.value ? "border-black" : "border-gray-300"
                      } flex items-center justify-center`}
                      onClick={() => setSortOption(option.value)}
                    >
                      {sortOption === option.value && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setIsSortOpen(false)} className="px-6 py-2 border border-gray-300 text-sm">
                  Close
                </button>
                <button onClick={() => setIsSortOpen(false)} className="px-6 py-2 bg-black text-white text-sm">
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {countActiveFilters() > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.category.map((category) => (
            <div key={`cat-${category}`} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm">
              <span className="capitalize">{category}</span>
              <button onClick={() => toggleFilter("category", category)} aria-label={`Remove ${category} filter`}>
                <X size={14} />
              </button>
            </div>
          ))}

          {activeFilters.color.map((color) => (
            <div key={`color-${color}`} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm">
              <span className="capitalize">{color}</span>
              <button onClick={() => toggleFilter("color", color)} aria-label={`Remove ${color} filter`}>
                <X size={14} />
              </button>
            </div>
          ))}

          {activeFilters.size.map((size) => (
            <div key={`size-${size}`} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm">
              <span>Size {size}</span>
              <button onClick={() => toggleFilter("size", size)} aria-label={`Remove size ${size} filter`}>
                <X size={14} />
              </button>
            </div>
          ))}

          {(activeFilters.price.min > 0 || activeFilters.price.max < 2000) && (
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm">
              <span>
                {formatPrice(activeFilters.price.min)} - {formatPrice(activeFilters.price.max)}
              </span>
              <button onClick={() => updatePriceRange(0, 2000)} aria-label="Reset price filter">
                <X size={14} />
              </button>
            </div>
          )}

          {activeFilters.isNew && (
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm">
              <span>New Arrivals</span>
              <button onClick={() => toggleBooleanFilter("isNew")} aria-label="Remove new arrivals filter">
                <X size={14} />
              </button>
            </div>
          )}

          {activeFilters.isSale && (
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm">
              <span>Sale</span>
              <button onClick={() => toggleBooleanFilter("isSale")} aria-label="Remove sale filter">
                <X size={14} />
              </button>
            </div>
          )}

          <button onClick={resetFilters} className="text-sm underline" aria-label="Clear all filters">
            Clear all
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6 text-sm text-gray-600">
        Showing {filteredProducts.length} of {initialProducts.length} products
      </div>
    </div>
  )
}

export default ProductFilters
