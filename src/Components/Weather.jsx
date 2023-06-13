import React from "react";
import {
  UilMapMarker,
  UilArrowUp,
  UilArrowDown,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import {
  formatToLocalTime,
  weatherIconURL,
} from "../Services/WeatherFetcher";

function Weather({ weather, currentLocation, units }) {
  return (
    <div className="flex flex-col justify-center md:w-3/4 md:mx-auto">
      <div className="flex flex-row justify-center items-center">
        <div className="flex items-center text-white text-2xl">
          {weather.name}
          {currentLocation && (
            <UilMapMarker size={20} className="fill-white ml-1" />
          )}
        </div>
      </div>

      <div className="flex flex-row items-start justify-center mt-2 text-white">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row text-9xl">
            {Math.round(weather.temp)} <span className="text-6xl">°</span>
          </div>
          <div className="flex items-center text-cyan-200 text-xl mt-2">
            {weather.details}
            <img
              src={weatherIconURL(weather.icon)}
              alt=""
              className="w-10 ml-1"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row text-white justify-center items-center text-lg mt-2">
        <UilArrowUp className="fill-white" />
        {Math.round(weather.temp_max)}° /
        <UilArrowDown className="fill-white" />
        {Math.round(weather.temp_min)}°<p className="mx-3">•</p>
        Feels like {Math.round(weather.feels_like)}°
      </div>

      <div className="flex flex-row mt-5 text-white text-lg mx-auto">

          <div className="flex flex-col items-start mr-10">
            <div className="flex flex-row items-center">
              <UilTear className="mx-2" /> {Math.round(weather.humidity)}%
            </div>
            <div className="flex flex-row items-center">
              <UilWind className="mx-2" /> {Math.round(weather.speed)} {units === "metric" ? "m/s" : "mph"}
            </div>
          </div>

          <div className="flex flex-col items-start mr-2">
            <div className="flex flex-row items-center">
              <UilSun className="mx-2" />
              {formatToLocalTime(weather.sunrise, weather.timezone, "HH:mm")}
            </div>
            <div className="flex flex-row items-center">
              <UilSunset className="mx-2" />
              {formatToLocalTime(weather.sunset, weather.timezone, "HH:mm")}
            </div>
          </div>

      </div>
    </div>
  );
}

export default Weather;
