import React from "react";
import { UilBars, UilCelsius, UilFahrenheit} from "@iconscout/react-unicons";
import ClearButton from "./ClearButton";

function Sidebar({ display, setDisplay, setQuery, setCurrentLocation, units, setUnits, setShowToast, setToastMessage }) {

  const handleCityClick = (location) => {
    // console.log("Set location: ", location);
    setQuery({ q: location });
    setCurrentLocation(false);
    handleHide();
  };

  // I know I've been copy and pasting stuff, will refactor later!
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        setQuery({ lat, lon });
        setCurrentLocation(true);
      });
    }
    handleHide();
  };

  const handleHide = () => {
    setDisplay(false);
  };

  const handleUnitChange = () => {
    if (units === "metric") {
      setUnits("imperial");
      setToastMessage("Units changed to imperial (°F, mph)!");
    } else {
      setUnits("metric");
      setToastMessage("Units changed to metric (°C, m/s)!");
    }
    setDisplay(false);
    setShowToast(true);
  }

  return (
    <div
      className={`absolute 
      py-5
      top-0 left-0 z-10
      w-full h-full 
      bg-blue-800
			${display ? "translate-x-0" : "-translate-x-full"}
			transition ease-in-out duration-300
      `}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-start my-8">

          <div className="flex flex-row mx-3 mr-auto cursor-pointer" onClick={() => handleUnitChange()}>
            {units !== "metric" ? <UilCelsius className='fill-cyan-200'/> : <UilFahrenheit className='fill-cyan-200'/>}
          </div>

          <UilBars
            size={25}
            className="
            mx-3
            cursor-pointer
            fill-blue-300"
            onClick={() => handleHide()}
          />
        </div>

        <div
          className="flex flex-row 
				justify-start items-center
				cursor-pointer
				pl-5 mb-5
				text-white text-lg"
          onClick={() => handleLocationClick()}
        >
          My Location
        </div>

        {localStorage.getItem("cities") !== null &&
          JSON.parse(localStorage.getItem("cities")).map((city, index) => {
            return (
              <div
                className="flex flex-row 
								justify-start items-center
								cursor-pointer
								pl-5 mb-5
							text-white text-lg"
                onClick={() => handleCityClick(`${city}`)}
                key={index}
              >
                {city}
              </div>
            );
          })
        }
        <ClearButton setDisplay={setDisplay} setShowToast={setShowToast} setToastMessage={setToastMessage} />

        <footer className="flex justify-center text-white mt-auto opacity-40 px-1 text-sm">
          Made with ❤️ by <a href="https://github.com/igouProto" className="mx-1 underline ">igouProto</a> with Tailwind CSS + React
        </footer>
      </div>
    </div>
  );
}

export default Sidebar;
