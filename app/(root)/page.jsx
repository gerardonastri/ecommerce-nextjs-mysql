import Categories from "@/components/Categories";
import FashionSlider from "@/components/Slider";
import Slider2 from "@/components/Slider2";
import Trending from "@/components/Trending";
import React from "react";

const Home = () => {


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
