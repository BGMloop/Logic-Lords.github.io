import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="sm:text-2xl text-8xl text-center text-bold">
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
        <div>
          <section className="text-gray-700 body-font relative">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-4">
                <h1 className="text-6xl font-medium title-font mb-4 text-gray-900">
                  Contact Us
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
                  Have a question for us? If you can't find what you're looking
                  for, we'd be happy to point you in the right direction.
                </p>
              </div>
              <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label for="name" className="text-4xl text-gray-600">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        for="email"
                        className="leading-7 text-4xl text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        for="message"
                        className="leading-7 text-4xl text-gray-600"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      ></textarea>
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button className="flex mx-auto text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-700 rounded text-lg">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Contact;
