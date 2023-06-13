import "./App.css";
import { useEffect, useState } from "react";

import SearchBar from "./Components/SearchBar";
import Weather from "./Components/Weather";
import SaveButton from "./Components/SaveButton";
import Sidebar from "./Components/Sidebar";
import Toast from "./Components/Toast";

import {
  getFormattedData,
  formatToLocalTime,
} from "./Services/WeatherFetcher";


function App() {
  const [query, setQuery] = useState({ q: "" });
  const [currentLocation, setCurrentLocation] = useState(true); // would be used to display a little icon telling if the weather is for the current location or not
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const get_weather = async () => {
    const data = await getFormattedData({ ...query, units });
    setWeather(data); //stuff data into the weather state var
  };

  useEffect(() => {
    get_weather();
  }, [query, units]);

  // use location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        setQuery({ lat, lon });
      });
    }
  }, []);

  // initialize local storage for saving cities
  useEffect(() => {
    if (!localStorage.getItem("cities")) {
      localStorage.setItem("cities", JSON.stringify(["London", "New York"]));
    }
  }, []);

  // for the sidebar
  const [showSidebar, setShowSidebar] = useState(false);

  // for the toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Toast!");

  return (
    <div className="flex flex-col h-screen py-5 px-5 bg-gradient-to-b from-blue-800 to-blue-400">

      <Sidebar 
        display={showSidebar} 
        setDisplay={setShowSidebar} 
        setQuery={setQuery} 
        setCurrentLocation={setCurrentLocation}
        units={units}
        setUnits={setUnits}
        setShowToast={setShowToast} 
        setToastMessage={setToastMessage}/>

      <SearchBar
        setQuery={setQuery}
        setCurrentLocation={setCurrentLocation}
        setDisplay={setShowSidebar}
        setShowToast={setShowToast} 
        setToastMessage={setToastMessage}
      />
      {weather && (
        <Weather weather={weather} currentLocation={currentLocation} units={units} />
      )}
      
      {weather && <SaveButton weather={weather} setShowToast={setShowToast} setToastMessage={setToastMessage} />}

      {weather && (
        <footer className="flex justify-center text-gray-100 mt-auto">
          Last Updated: {formatToLocalTime(weather.dt, weather.timezone)}
        </footer>
      )}

      <Toast show={showToast} setShow={setShowToast} message={toastMessage}/>

    </div>
  );
}

export default App;
