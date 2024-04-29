// uiService.js

let WeatherIcon;

export const setWeatherIcon = (iconElement) => {
  WeatherIcon = iconElement;
};

export const updateCurrentWeatherUI = (data) => {
  document.querySelector(
    "#location"
  ).innerHTML = `${data.name}, ${data.sys.country}`;
  document.querySelector("#temp").innerHTML = `${Math.round(
    data.main.temp
  )} °C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidité : ${data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Vitesse du Vent : ${data.wind.speed}km/h`;
  document.querySelector("#desc").innerHTML = data.weather[0].description;
};

export const updateWeatherIcon = (weatherMain) => {
  const weatherIcons = {
    Clouds: "../../public/images/clouds.png",
    Clear: "../../public/images/clear.png",
    Rain: "../../public/images/rain.png",
    Drizzle: "../../public/images/drizzle.png",
    Mist: "../../public/images/mist.png",
  };

  WeatherIcon.src = weatherIcons[weatherMain] || WeatherIcon.src;
};

export const updateCurrentDateUI = () => {
  const currentDate = new Date(); // Get the current date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.querySelector("#currentDate").innerHTML =
    currentDate.toLocaleDateString("fr-FR", options);
};

// Plus d'éléments d'UI à venir...
