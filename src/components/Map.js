import React from "react";
import { useCallback, useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
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
  const [status, setStatus] = useState(null);
  const locationRef1 = useRef(null);
  const locationRef2 = useRef(null);
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [midpoint, setMidpoint] = useState(null);

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
          // set the location1 to the current location and pan the map to the location
          setLocation1({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          map.panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          map.setZoom(14);
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

      // calculate the midpoint using the Haversine formula
      const R = 6371; // Earth's radius in kilometers
      const dLat = toRad(location2.lat - location1.lat);
      const dLon = toRad(location2.lng - location1.lng);
      const lat1 = toRad(location1.lat);
      const lat2 = toRad(location2.lat);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      const midpointLat = (location1.lat + location2.lat) / 2;
      const midpointLng = (location1.lng + location2.lng) / 2;
      setMidpoint({ lat: midpointLat, lng: midpointLng });

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
            // log the distance and duration from point a to point b to the console
            console.log(result.rows[0].elements[0].distance.text);
            console.log(result.rows[0].elements[0].duration.text);
            // log the midpoint to the console
            console.log(midpoint);
            // put a marker on the midpoint
            new window.google.maps.Marker({
              position: midpoint,
              map,
              title: "Midpoint",
            });
          } else {
            console.error(`error fetching distance ${result}`);
          }
        }
      );
    }
  }, [location1, location2, map]);

  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  return isLoaded ? (
    <div className="flex flex-col items-center mt-2">
      <div className="lg:w-1/2 md:w-2/3">
        <div className="flex flex-col md:flex-row items-center text-center mb-4">
          <div className="p-1 w-3/4">
            <div className="relative">
              <label for="name" className="text-4xl text-center text-gray-600">
                Location 1
              </label>
              <Autocomplete>
                <input
                  ref={locationRef1}
                  fields={[
                    "address_components",
                    "formatted_address",
                    "geometry",
                  ]}
                  type="address"
                  id="address"
                  placeholder="address 1"
                  name="address"
                  className="w-full mt-4 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </Autocomplete>
            </div>
          </div>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded-full mb-12"
            onClick={getLocation}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-map-pin"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 4.58 6.75 12.42 6.75 12.42a1 1 0 0 0 1.5 0C14.25 21.42 21 13.58 21 9c0-3.87-3.13-7-7-7z"></path>
              <circle cx="12" cy="9" r="2.5"></circle>
            </svg>
          </button>
          <div className="p-1 w-3/4">
            <div className="relative">
              <label for="email" className="text-4xl text-gray-600">
                Location 2
              </label>
              <Autocomplete>
                <input
                  ref={locationRef2}
                  fields={[
                    "address_components",
                    "formatted_address",
                    "geometry",
                  ]}
                  type="address"
                  id="address"
                  placeholder="address 2"
                  name="address"
                  className="w-full mt-4 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </Autocomplete>
            </div>
          </div>
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={mapStyle}
        center={denton}
        zoom={5}
        onLoad={(map) => setMap(map)}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={location1} />
        <Marker position={location2} />
      </GoogleMap>
      <button
        className="flex mx-auto mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-12 rounded-full"
        onClick={locationClick}
      >
        Submit
      </button>
    </div>
  ) : (
    <></>
  );
}
