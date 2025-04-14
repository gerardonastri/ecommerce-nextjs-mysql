"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingLogo({
  logoSrc = "/logo.png", // Default logo path
  size = "md",
  fullPage = true,
  text = "Caricamento...",
}) {
  // Size mappings for the logo
  const sizeMap = {
    sm: 60,
    md: 80,
    lg: 120,
  };

  const logoSize = sizeMap[size];

  // Animation for the logo
  const logoAnimation = {
    initial: { opacity: 0.6, scale: 0.9 },
    animate: {
      opacity: [0.6, 1, 0.6],
      scale: [0.9, 1.05, 0.9],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Animation for the dots
  const dotsAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotAnimation = {
    initial: { opacity: 0, y: 0 },
    animate: {
      opacity: [0, 1, 0],
      y: [0, -5, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const renderContent = () => (
    <div className="flex flex-col items-center">
      <motion.div
        variants={logoAnimation}
        initial="initial"
        animate="animate"
        className="relative"
        style={{ width: logoSize, height: logoSize }}
      >
        <Image
          src={logoSrc || "/placeholder.svg"}
          alt="Loading"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {text && (
        <div className="mt-4 flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {text}
          </span>
          <motion.div
            className="flex ml-1"
            variants={dotsAnimation}
            initial="initial"
            animate="animate"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                variants={dotAnimation}
                className="w-1 h-1 mx-0.5 rounded-full bg-gray-700 dark:bg-gray-300"
              />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );

  // If fullPage, render a centered spinner that takes the full viewport
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-sm z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    );
  }

  // Default inline spinner
  return <div className="flex justify-center py-8">{renderContent()}</div>;
}
