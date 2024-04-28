const APIKEY = "0bc24baa04e5530f2d01ede93fc82ed1";
let WeatherIcon;

document.addEventListener("DOMContentLoaded", function () {
  WeatherIcon = document.querySelector(".weather-icon");
  let apiCall = function (city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`;
    let urlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=metric&lang=fr`;
    console.log(url, urlFiveDays);

    fetch(urlFiveDays).then((response2) =>
      response2.json().then((data2) => {
        console.table(data2);
      })
    );

    fetch(url).then((response) =>
      response.json().then((data) => {
        console.log(data);
        document.querySelector("#location").innerHTML =
          data.name + ", " + data.sys.country;
        document.querySelector("#temp").innerHTML =
          Math.round(data.main.temp) + " °C";
        document.querySelector("#humidity").innerHTML =
          "Humidité : " + data.main.humidity + "%";
        document.querySelector("#wind").innerHTML =
          "Vitesse du Vent : " + data.wind.speed + "km/h";
        document.querySelector("#desc").innerHTML = data.weather[0].description;

        if (data.weather[0].main == "Clouds") {
          WeatherIcon.src = "/images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
          WeatherIcon.src = "/images/clear.png";
        } else if (data.weather[0].main == "Rain") {
          WeatherIcon.src = "/images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
          WeatherIcon.src = "/images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
          WeatherIcon.src = "/images/mist.png";
        }

        const currentDate = new Date(); // Get the current date
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        document.querySelector("#currentDate").innerHTML =
          currentDate.toLocaleDateString("fr-FR", options);
      })
    );
    // .catch((err) => console.log('Erreur : ' + err));
  };

  document.querySelector("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    let ville = document.querySelector("#inputCity").value;

    apiCall(ville.trim().replace(/\s+/g, "-"));
  });

  apiCall("Vitré");
});
