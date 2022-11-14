import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="sm:text-2xl lg:text-8xl text-center text-bold">
      <div>
        <h1 className="sm:text-2xl lg:text-4xl mx-[150px] my-[75px]">
          This is the home page
        </h1>
      </div>
    </div>
  );
}
