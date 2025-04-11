import Categories from "@/components/Categories";
import FashionSlider from "@/components/Slider";
import Slider2 from "@/components/Slider2";
import Trending from "@/components/Trending";
import React from "react";

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

const Home = async () => {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div>
      <FashionSlider />
      <Categories />
      <Trending />
      <Slider2 />
    </div>
  );
};

export default Home;
