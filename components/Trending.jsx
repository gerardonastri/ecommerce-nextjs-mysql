import Image from "next/image";
import React from "react";
import Card from "./Card";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const Trending = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("products")
    .select("*") // adatta questi campi
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.error("Errore Supabase:", error.message);
  }

  return (
    <section className="wrapper !my-[100px] relative">
      <h2 className="font-playfair text-3xl text-center font-bold">
        Trending now
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {data?.map((item, i) => (
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
