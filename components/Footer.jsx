import React from "react"
import Link from "next/link";

const NewsletterForm = () => (
  <form className="flex items-center gap-3">
    <input
      type="text"
      placeholder="Enter your email"
      className="border-none bg-gray-600 rounded-3xl py-2 px-4 placeholder:text-gray-300"
    />
    <button className="block mx-auto bg-white text-black border-2 border-black rounded-[1.5rem] px-6 py-2 hover:bg-black hover:text-white cursor-pointer">
      Subscribe
    </button>
  </form>
);

const Footer = () => {
  const footerLinks = {
    men: {
      title: "Men",
      links: [
        { label: "Shirts & Polos", href: "/men/shirts-polos" },
        { label: "T-Shirts & Sweaters", href: "/men/tshirts-sweaters" },
        { label: "Jackets & Coats", href: "/men/jackets-coats" },
        { label: "Pants & Jeans", href: "/men/pants-jeans" },
        { label: "Shoes", href: "/men/shoes" },
        { label: "Accessories", href: "/men/accessories" },
      ],
    },
    women: {
      title: "Women",
      links: [
        { label: "Dresses", href: "/women/dresses" },
        { label: "Tops & Blouses", href: "/women/tops-blouses" },
        { label: "Sweaters & Cardigans", href: "/women/sweaters-cardigans" },
        { label: "Jackets & Coats", href: "/women/jackets-coats" },
        { label: "Skirts & Pants", href: "/women/skirts-pants" },
        { label: "Accessories", href: "/women/accessories" },
      ],
    },
    kids: {
      title: "Kids",
      links: [
        { label: "Girls", href: "/kids/girls" },
        { label: "Boys", href: "/kids/boys" },
        { label: "Baby", href: "/kids/baby" },
        { label: "Accessories", href: "/kids/accessories" },
      ],
    },
    company: {
      title: "The Company",
      links: [
        { label: "My Order", href: "/my-order" },
        { label: "Contact Us", href: "/contact" },
        { label: "About JerCommerce", href: "/about" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "Careers", href: "/careers" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    },
  };

  return (
    <footer className="mt-[100px]">
      <div className="bg-[#1F1F1F] py-10">
        <div className="wrapper flex flex-col md:flex-row gap-10 justify-between md:items-center">
          <h2 className="text-4xl text-white">
            Subscribe to Our <br />
            <span className="text-gray-500 text-left font-playfair text-5xl">
              Newsletter
            </span>
          </h2>
          <NewsletterForm />
        </div>
      </div>
      <div className="bg-black py-14">
        <div className="wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
          {/* Men Section */}
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-medium mb-6 pb-2 border-b border-gray-700">
              {footerLinks.men.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.men.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Women Section */}
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-medium mb-6 pb-2 border-b border-gray-700">
              {footerLinks.women.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.women.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kids Section */}
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-medium mb-6 pb-2 border-b border-gray-700">
              {footerLinks.kids.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.kids.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-medium mb-6 pb-2 border-b border-gray-700">
              {footerLinks.company.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="wrapper !mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} JerCommerce. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm  text-gray-500 hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm  text-gray-500 hover:text-white"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
