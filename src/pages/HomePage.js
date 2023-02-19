import React from "react";
import HomePageHeroView from "../views/HomePageHeroView";
import NavBar from "../components/NavBar";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <HomePageHeroView />
    </div>
  );
}
