import React from "react";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ListItems from "../cat/_components/list-items";

const page = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("products").select("*");

  return (
    <main>
      <ListItems items={data} />
    </main>
  );
};

export default page;
