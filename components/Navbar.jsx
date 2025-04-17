"use client";

import React from "react";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { useStore } from "@/utils/zustand/useStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile based on window width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: "/cat/men", label: "Men" },
    { href: "/cat/women", label: "Women" },
    { href: "/cat/kids", label: "Kids" },
    { href: "/sale", label: "Sale" },
    { href: "/collections", label: "Collections" },
  ];

  const iconLinks = [
    {
      icon: <Heart className="h-5 w-5" />,
      href: "/wishlist",
      label: "Wishlist",
    },
    { icon: <User className="h-5 w-5" />, href: "/account", label: "Account" },
    { icon: <ShoppingBag className="h-5 w-5" />, href: "/cart", label: "Cart" },
  ];

  // const cart = useStore((state) => state.cart);

  return (
    <nav className="px-6 md:px-10 lg:px-20 flex items-center justify-between pt-6 md:pt-10 relative">
      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden z-50"
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Logo */}
      <Link
        href="/"
        title="logo"
        className={` text-2xl md:text-4xl font-playfair ${
          isMobile && !isOpen ? "mx-auto" : ""
        }`}
      >
        JerCommerce
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
        {navLinks.map((link) => (
          <motion.div
            key={link.label}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href={link.href}
              className="text-sm lg:text-base hover:font-medium transition-all"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center gap-5 lg:gap-7">
        {iconLinks.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link href={item.href} aria-label={item.label}>
              {item.icon}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile Menu (Full Screen) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Mobile Navigation Links */}
            <div className="flex flex-col items-center gap-8 mb-12">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-xl font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Icons */}
            <div className="flex justify-center gap-12 mt-auto mb-12">
              {iconLinks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex flex-col items-center gap-2"
                    onClick={() => setIsOpen(false)}
                    aria-label={item.label}
                  >
                    <div className="p-3 bg-gray-100 rounded-full">
                      {React.cloneElement(item.icon, { className: "h-6 w-6" })}
                    </div>
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
