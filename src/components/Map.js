import React from "react";
import { useCallback, useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete} from "@react-google-maps/api";
import API_KEY from "../API_KEY.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const center = {
  lat: 33.25398070865379,
  lng: -97.15243503175917,
};

const mapStyle = {
  height: "70vh",
  width: "70vw",
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY.MAPS_API,
    libraries: ['places']
  });

  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="flex flex-col items-center mt-12">
      <GoogleMap
        mapContainerStyle={mapStyle}
        center={center}
        zoom={17}
        onLoad={(map) => setMap(map)}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={center} />
      </GoogleMap>
      <div className="lg:w-1/2 md:w-2/3 mt-4">
        <div className="flex flex-col md:flex-row mb-8 items-center text-center">
          <div className="p-1 w-3/4">
            <div className="relative">
              <label for="name" className="text-4xl text-center text-gray-600">
              <button onClick = {getLocation}>
              <FontAwesomeIcon icon= {faLocationDot} />
              </button>
                Location 1
              </label>
              <Autocomplete>
              <input
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
      </div>
    </div>
  ) : (
    <></>
  );
}
