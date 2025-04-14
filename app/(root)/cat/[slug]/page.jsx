import React from "react";
import CategoryHero from "../_components/cat-hero";
import Card from "@/components/Card";
import ListItems from "../_components/list-items";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const page = async ({ params }) => {
  const cat = (await params).slug;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", `${cat.toLowerCase()}`);

  return (
    <main>
      <CategoryHero category={cat} />
      <ListItems items={data} />
    </main>
  );
};

export default page;
