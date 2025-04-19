import Image from "next/image";
import React from "react";
import Card from "./Card";
import Link from "next/link";

const Trending = () => {
  const items = [
    {
      title: "T-shirt Oversize Bianca",
      price: "19.99€",
      img: "/trending/img-1.webp",
    },
    {
      title: "Jeans Slim Fit Blu",
      price: "39.99€",
      img: "/trending/img-2.jpeg",
    },
    {
      title: "Giacca in Denim",
      price: "59.99€",
      img: "/trending/img-3.jpeg",
    },
    {
      title: "Felpa con Cappuccio Nera",
      price: "29.99€",
      img: "/trending/img-4.jpeg",
    },
  ];

  return (
    <section className="wrapper !my-[100px] relative">
      <h2 className="font-playfair text-3xl text-center font-bold">
        Trending now
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {items.map((item, i) => (
          <Card item={item} key={i} />
        ))}
      </div>
      <button className="block mx-auto bg-white text-black border-2 border-black rounded-[1.5rem] px-8 py-2 mt-10 hover:bg-black hover:text-white cursor-pointer">
        <Link href="/products">Show All</Link>
      </button>
    </section>
  );
};

export default Trending;
