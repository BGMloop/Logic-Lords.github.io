import React from "react";
import { useCallback, useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  LoadScriptNext,
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
  const testRef = useRef(null);
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);

  // Get users current location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
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

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // hancle the location1 input
  const location1Click = () => {
    setLocation1(testRef.current.value);
  };

  // convert address to lat and lng
  useEffect(() => {
    if (location1) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location1 }, (results, status) => {
        if (status === "OK") {
          console.log(results[0].geometry.location);
          setLocation1(results[0].geometry.location);

          // set the center of the map to location1 and pan the map to the location
          map.panTo(results[0].geometry.location);
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    }
  }, [location1]);

  return isLoaded ? (
    <div className="flex flex-col items-center mt-12">
      <GoogleMap
        mapContainerStyle={mapStyle}
        center={denton}
        zoom={15}
        onLoad={(map) => setMap(map)}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={location1} />
      </GoogleMap>
      <div className="lg:w-1/2 md:w-2/3 mt-4">
        <div className="flex flex-col md:flex-row mb-8 items-center text-center">
          <div className="p-1 w-3/4">
            <div className="relative">
              <label for="name" className="text-4xl text-center text-gray-600">
                <button onClick={getLocation}>
                  <FontAwesomeIcon icon={faLocationDot} />
                </button>
                Location 1
              </label>
              <Autocomplete>
                <input
                  ref={testRef}
                  type="address"
                  id="address"
                  placeholder="address 1"
                  name="address"
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </Autocomplete>
              <button onClick={location1Click}>Submit</button>
            </div>
          </div>
          <div className="p-1 w-3/4">
            <div className="relative">
              <label for="email" className="text-4xl text-gray-600">
                Location 2
              </label>
              <Autocomplete>
                <input
                  type="address"
                  id="address"
                  placeholder="address 2"
                  name="address"
                  value={location2}
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </Autocomplete>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
