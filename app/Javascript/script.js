let WeatherIcon;

document.addEventListener("DOMContentLoaded", function () {
  WeatherIcon = document.querySelector(".weather-icon");
  let apiCall = function (city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
    let urlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
    // console.log(url, urlFiveDays);

    fetch(urlFiveDays).then((response) =>
      response.json().then((data) => {
        console.log(data);
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
          WeatherIcon.src = "../../public/images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
          WeatherIcon.src = "../../public/images/clear.png";
        } else if (data.weather[0].main == "Rain") {
          WeatherIcon.src = "../../public/images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
          WeatherIcon.src = "../../public/images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
          WeatherIcon.src = "../../public/images/mist.png";
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

  // apiCall("Vitré");
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let gps = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    // console.log(gps);

    fetch(gps).then((response) =>
      response.json().then((data) => {
        console.log(data);
        let city =
          data.address.city || data.address.town || data.address.village;
        console.log(city);
        apiCall(city);
      })
    );
  });
});
