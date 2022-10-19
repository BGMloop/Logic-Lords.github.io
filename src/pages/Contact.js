import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="text-8xl text-center text-bold">
      <div className="flex flex-row justify-center bg-slate-400">
        <Link to="/">
          <button className="text-white hover:text-black font-bold py-2 px-6">
            Home
          </button>
        </Link>
        <Link to="/about">
          <button className="text-white hover:text-black font-bold py-2 px-6 rounded">
            About
          </button>
        </Link>
        <Link to="/contact">
          <button className=" text-black font-bold py-2 px-6 rounded">
            Contact
          </button>
        </Link>
        <Link to="/signin">
          <button className="text-white hover:text-black font-bold py-2 px-6 rounded">
            Login
          </button>
        </Link>
      </div>
      <div>
        <h1 className="text-4xl mx-[150px] my-[75px]">
          This is the contact us page
        </h1>
      </div>
    </div>
  );
}

export default Contact;
