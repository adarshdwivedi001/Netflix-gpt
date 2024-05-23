import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSugesstion from "./GptMovieSugesstion";
import { BG_BANNER } from "../utils/constant";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img src={BG_BANNER} alt="Background_image" />
      </div>
      <GptSearchBar />
      <GptMovieSugesstion />
    </div>
  );
};

export default GptSearch;
