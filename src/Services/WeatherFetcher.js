import { DateTime } from "luxon";

const APIKey = process.env.REACT_APP_API_KEY
const base_url = "https://api.openweathermap.org/data/2.5/" 
// weather?q={city name}&appid={API key} (for regular call)
// data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} (for onecall)

const getWeatherData = (info_type, query_params) => {
    const url = new URL(base_url + '/' + info_type);
    if (!query_params.units){ //fallback. would remove eventually
        query_params.units = 'metric';
    }

    url.search = new URLSearchParams({...query_params, appid: APIKey})
    return fetch(url)
    .then((result) => result.json());
};

const formatWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        timezone,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main: details, icon} = weather[0];

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, timezone, country, sunrise, sunset, details, icon, speed};
}

const getFormattedData = async (query_params) => {
    const formatted_data = await getWeatherData('weather', query_params).then(formatWeather);
    console.log(query_params);
    console.log(formatted_data);
    return formatted_data;
}

const formatToLocalTime = (seconds, timezone, format = "cccc, dd LLL yyyy • HH:mm'") => {
    return DateTime.fromSeconds(seconds).setZone(timezone/60).toFormat(format);
}

const weatherIconURL = (icon_code) => `http://openweathermap.org/img/wn/${icon_code}@4x.png`;

export {getFormattedData, formatToLocalTime, weatherIconURL};

