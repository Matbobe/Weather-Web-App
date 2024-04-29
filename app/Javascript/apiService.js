import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;
console.log(API_KEY);

export const fetchCurrentWeather = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
  );
};

export const fetchWeatherForecast = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
  );
};

export const fetchReverseGeocoding = (lat, lon) => {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
  );
};
