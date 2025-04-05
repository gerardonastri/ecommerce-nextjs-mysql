import Link from "next/link";
import React from "react";
import { Heart, User, ShoppingBag } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="wrapper flex items-center justify-between pt-10 ">
      <Link href="/" title="logo" className="font-playfair bold text-4xl">
        JerCommerce
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/">Men</Link>
        <Link href="/">Women</Link>
        <Link href="/">Kids</Link>
        <Link href="/">Sale</Link>
        <Link href="/">Collections</Link>
      </div>
      <div className="flex items-center gap-5">
        <Heart />
        <User />
        <ShoppingBag />
      </div>
    </nav>
  );
};

export default Navbar;
