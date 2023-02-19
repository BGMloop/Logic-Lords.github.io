import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="sm:text-2xl lg:text-8xl text-center text-bold">
      <div>
        <section className="text-gray-700 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-4">
              <h1 className="text-6xl font-medium title-font mb-4 text-gray-900">
                About Us
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
                We are a team of developers who are passionate about creating
                the worlds best way for friends and family to find a meeting
                spot that is halfway for both parties. Meet Me Halfway is an
                independently produced service for approximating the halfway
                point of any mapped route. Made possible by the Google Maps API,
                Meet Me Halfway is a free service that allows you to find the
                midpoint of any route.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
