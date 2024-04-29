import { fetchCurrentWeather } from "./apiService.js";
import {
  setWeatherIcon,
  updateCurrentWeatherUI,
  updateWeatherIcon,
  updateCurrentDateUI,
} from "./uiService.js";
import { formatCityName } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const iconElement = document.querySelector(".weather-icon");
  setWeatherIcon(iconElement);

  document.querySelector("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    const cityInput = document.querySelector("#inputCity").value;
    const formattedCityName = formatCityName(cityInput);

    fetchCurrentWeather(formattedCityName)
      .then((response) => response.json())
      .then((data) => {
        updateCurrentWeatherUI(data);
        updateWeatherIcon(data.weather[0].main);
        updateCurrentDateUI();
      })
      .catch((error) => console.error("Erreur : ", error));

    // Géolocalisation et autres interactions utilisateur...
  });

  // Initialisation avec la géolocalisation ou une ville par défaut...
});
