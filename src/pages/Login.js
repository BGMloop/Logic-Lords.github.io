import React from "react";
import LoginPageHeroView from "../views/LoginPageHeroView";
import NavBar from "../components/NavBar";

export default function LoginPage() {
  return (
    <div>
      <NavBar />
      <LoginPageHeroView />
    </div>
  );
}
