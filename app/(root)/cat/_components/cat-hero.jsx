"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const CategoryHero = ({ category }) => {
  // Normalize category name for comparison
  const normalizedCategory = category?.toLowerCase() || ""

  // Define content for each category
  const heroContent = {
    men: {
      title: "Men's Collection",
      description:
        "Discover our curated selection of contemporary menswear. From tailored essentials to statement pieces that define modern masculinity.",
      image: "/trending/img-1.webp",
      products: 124,
      color: "bg-stone-100",
    },
    women: {
      title: "Women's Collection",
      description:
        "Explore our women's collection featuring elegant silhouettes and timeless designs. Crafted with precision for the modern woman.",
      image: "/trending/img-1.webp",
      products: 156,
      color: "bg-neutral-100",
    },
    kids: {
      title: "Kids Collection",
      description:
        "Playful designs meet practical comfort in our kids collection. Durable, stylish pieces that grow with their imagination.",
      image: "/trending/img-2.jpeg",
      products: 87,
      color: "bg-amber-50",
    },
    sneakers: {
      title: "Men's Sneakers",
      description: "Shop men's sneakers. Discover casual leather and suede styles perfect for your laid-back wardrobe.",
      image: "/trending/img-1.jpeg",
      products: 29,
      color: "bg-stone-200",
    },
    default: {
      title: "Our Collection",
      description:
        "Discover our latest arrivals and timeless classics. Quality craftsmanship meets contemporary design.",
      image: "/trending/img-4.jpeg",
      products: 200,
      color: "bg-gray-100",
    },
  }

  // Select the appropriate content based on category or use default
  const content =
    heroContent[normalizedCategory] ||
    heroContent[Object.keys(heroContent).find((key) => normalizedCategory.includes(key)) || "default"]

  return (
    <div className={`w-full ${content.color} mt-10`}>
      <div className="max-w-[1400px] mx-auto relative overflow-hidden">
        {/* Hero Layout 1: For Men's category */}
        {normalizedCategory === "men" && (
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
            <motion.div
              className="flex flex-col justify-center p-8 md:p-16"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{content.title}</h1>
              <p className="text-gray-700 mb-8 max-w-md">{content.description}</p>
              <div className="flex items-center">
                <span className="border border-black px-4 py-1.5 text-sm font-medium">{content.products} products</span>
              </div>
            </motion.div>
            <motion.div
              className="relative h-[400px] md:h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src={content.image || "/placeholder.svg"}
                alt={content.title}
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </div>
        )}

        {/* Hero Layout 2: For Women's category */}
        {normalizedCategory === "women" && (
          <div className="relative min-h-[500px] flex items-center">
            <Image
              src={content.image || "/placeholder.svg"}
              alt={content.title}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            <motion.div
              className="relative z-10 p-8 md:p-16 max-w-xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{content.title}</h1>
              <p className="mb-8">{content.description}</p>
              <div className="flex items-center">
                <span className="border border-white px-4 py-1.5 text-sm font-medium">{content.products} products</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Hero Layout 3: For Kids and other categories */}
        {normalizedCategory !== "men" && normalizedCategory !== "women" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px]">
            <motion.div
              className="lg:col-span-8 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={content.image || "/placeholder.svg"}
                alt={content.title}
                width={1000}
                height={400}
                className="w-full h-[300px] md:h-[400px] object-cover object-center"
                priority
              />
            </motion.div>
            <motion.div
              className="lg:col-span-4 flex flex-col justify-center p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h1>
              <p className="text-gray-700 mb-6 text-sm md:text-base">{content.description}</p>
              <div className="flex items-center">
                <span className="border border-black px-4 py-1.5 text-sm font-medium">{content.products} products</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryHero
