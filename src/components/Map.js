import React from "react";
import { useCallback, useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  LoadScriptNext,
  Polyline,
} from "@react-google-maps/api";
import API_KEY from "../API_KEY.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const denton = {
  lat: 33.21618224226912,
  lng: -97.1332708813027,
};

const mapStyle = {
  height: "70vh",
  width: "70vw",
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY.MAPS_API,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(denton.lat);
  const [lng, setLng] = useState(denton.lng);
  const [status, setStatus] = useState(null);
  const locationRef1 = useRef(null);
  const locationRef2 = useRef(null);
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  // Get users current location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      // remove the location1 and location2 from the map
      setLocation1(null);
      setLocation2(null);

      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          // set the location1 to the current location and pan the map to the location
          setLocation1({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          map.panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // handle location 1 and 2 submit button click
  const locationClick = () => {
    setLocation1(locationRef1.current.value);
    setLocation2(locationRef2.current.value);
  };

  // convert and pin location 1 and 2 on the map
  useEffect(() => {
    if (location1 && location2) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location1}&key=${API_KEY.MAPS_API}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLocation1({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          });
          map.setZoom(15);
        });

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location2}&key=${API_KEY.MAPS_API}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLocation2({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          });
          map.setZoom(15);
        });

      // create a directions renderer
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      // get directions from location 1 to location 2
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: location1,
          destination: location2,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            directionsRenderer.setMap(map);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );

      /*
      const distanceService = new window.google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix(
        {
          origins: [location1],
          destinations: [location2],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DistanceMatrixStatus.OK) {
            setDistance(result.rows[0].elements[0].distance.text);
            setDuration(result.rows[0].elements[0].duration.text);
            // log the distance and duration to the console
            console.log(result.rows[0].elements[0].distance.text);
            console.log(result.rows[0].elements[0].duration.text);
          } else {
            console.error(`error fetching distance ${result}`);
          }
        }
      );
      */
    }
  }, [location1, location2, map]);

  return isLoaded ? (
    <div className="flex flex-col items-center mt-4">
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={getLocation}
      >
        Get Device location
      </button>
      <GoogleMap
        mapContainerStyle={mapStyle}
        center={denton}
        zoom={15}
        onLoad={(map) => setMap(map)}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={location1} />
        <Marker position={location2} />
      </GoogleMap>
      <div className="lg:w-1/2 md:w-2/3 mt-4">
        <div className="flex flex-col md:flex-row mb-8 items-center text-center">
          <div className="p-1 w-3/4">
            <div className="relative">
              <label for="name" className="text-4xl text-center text-gray-600">
                Location 1
              </label>
              <Autocomplete>
                <input
                  ref={locationRef1}
                  type="address"
                  id="address"
                  placeholder="address 1"
                  name="address"
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </Autocomplete>
            </div>
          </div>
          <div className="p-1 w-3/4">
            <div className="relative">
              <label for="email" className="text-4xl text-gray-600">
                Location 2
              </label>
              <Autocomplete>
                <input
                  ref={locationRef2}
                  type="address"
                  id="address"
                  placeholder="address 2"
                  name="address"
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </Autocomplete>
            </div>
          </div>
        </div>
        <button
          className="flex mx-auto mt-[-20px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-12 rounded-full"
          onClick={locationClick}
        >
          Submit
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
}
