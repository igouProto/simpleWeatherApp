import React from "react";
import { useState } from "react";
import { UilSearch, UilMapMarker, UilBars } from "@iconscout/react-unicons";

function SearchBar({ setQuery, setCurrentLocation, setDisplay, setShowToast, setToastMessage }) {
  const [city, setCity] = useState("");

  const handle_search_click = () => {
    if (city !== "") {
      setQuery({ q: city });
      setCurrentLocation(false);
    }
  };

  const handle_location_click = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        setQuery({ lat, lon });
        setCurrentLocation(true);
        setCity("");
        setToastMessage("Using current location!");
        setShowToast(true);
      });
    }
  };

  return (
    <div className="flex flex-row justify-center items-center my-8">
      <UilBars
        size={25}
        className="mr-3 text-white text-xl
            cursor-pointer
            fill-blue-300
            transition ease-out"
        onClick={() => setDisplay(true)}
      />

      <input
        type="text"
        className="px-2 py-1 mr-4 w-full rounded-lg bg-transparent 
            border-solid border-2 border-blue-500 
            text-gray-200
            hover:border-blue-300
            focus:outline-none focus:border-blue-300
            transition ease-out"
        placeholder="Search..."
        value={city}
        onChange={(ev) => setCity(ev.target.value)}
      />

      <UilSearch
        size={25}
        className="mr-3 text-white text-xl
            cursor-pointer
            fill-blue-300
            transition ease-out"
        onClick={handle_search_click}
      />

      <UilMapMarker
        size={25}
        className="text-white text-xl 
            cursor-pointer
            fill-blue-300
            transition ease-out"
        onClick={handle_location_click}
      />
    </div>
  );
}

export default SearchBar;
