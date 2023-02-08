let latSkövde = "58.3902782";
let lonSkövde = "13.8461208";

let searchBar = document.querySelector("#search-bar");
let navigationButton = document.querySelector("#navigation-button");

const newWindow = () => {
  if (searchBar.value !== "") {
    window.location = "weather-city.html?searchBar=" + searchBar.value;
  }
};
navigationButton.addEventListener("click", newWindow);

window.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    newWindow();
  }
});

fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=59.3251172&lon=18.0710935&appid=522a9f3cd92ded5c0f211fd40fe17e5b"
)
  .then((response) => response.json())
  .then((result) => {
    const mainTemperatureFarenheit = result.main.temp;
    const mainTemperatureCelsius = Math.round(
      mainTemperatureFarenheit - 272.15
    );

    const temperature = document.querySelector("#temperature-stockholm");
    temperature.textContent = mainTemperatureCelsius + "℃";

    const windSpeed = result.wind.speed;
    const wind = document.querySelector("#wind-stockholm");
    wind.textContent = "wind " + windSpeed + "m/s";

    const clouds = result.clouds.all;
    const cloudiness = document.querySelector("#clouds-stockholm");
    cloudiness.textContent = "cloudiness " + clouds + "%";

    const iconCode = result.weather[0].icon;
    const iconBox = document.querySelector("#icon-stockholm");
    iconBox.src = "http://openweathermap.org/img/w/" + iconCode + ".png";

    const currentWeatherDescription = result.weather[0].description;
    const weatherDescription = document.querySelector(
      "#weather-decription-stockholm"
    );
    weatherDescription.textContent = currentWeatherDescription;
    const startWeatherBox = document.querySelector("#weather-stockholm");
    startWeatherBox.addEventListener("click", () => {
      window.location = "weather-city.html?searchBar=stockholm";
    });
  });

fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=55.6867&lon=12.5701&appid=522a9f3cd92ded5c0f211fd40fe17e5b"
)
  .then((response) => response.json())
  .then((result) => {
    const mainTemperatureFarenheit = result.main.temp;
    const mainTemperatureCelsius = Math.round(
      mainTemperatureFarenheit - 272.15
    );

    const temperature = document.querySelector("#temperature-copenhagen");
    temperature.textContent = mainTemperatureCelsius + "℃";

    const windSpeed = result.wind.speed;
    const wind = document.querySelector("#wind-copenhagen");
    wind.textContent = "wind " + windSpeed + "m/s";

    const clouds = result.clouds.all;
    const cloudiness = document.querySelector("#clouds-copenhagen");
    cloudiness.textContent = "cloudiness " + clouds + "%";

    const iconCode = result.weather[0].icon;
    const iconBox = document.querySelector("#icon-copenhagen");
    iconBox.src = "http://openweathermap.org/img/w/" + iconCode + ".png";

    const currentWeatherDescription = result.weather[0].description;
    const weatherDescription = document.querySelector(
      "#weather-decription-copenhagen"
    );
    weatherDescription.textContent = currentWeatherDescription;

    const startWeatherBox = document.querySelector("#weather-copenhagen");
    startWeatherBox.addEventListener("click", () => {
      window.location = "weather-city.html?searchBar=copenhagen";
    });
  });

fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=59.9133&lon=10.739&appid=522a9f3cd92ded5c0f211fd40fe17e5b"
)
  .then((response) => response.json())
  .then((result) => {
    const mainTemperatureFarenheit = result.main.temp;
    const mainTemperatureCelsius = Math.round(
      mainTemperatureFarenheit - 272.15
    );

    const temperature = document.querySelector("#temperature-oslo");
    temperature.textContent = mainTemperatureCelsius + "℃";

    const windSpeed = result.wind.speed;
    const wind = document.querySelector("#wind-oslo");
    wind.textContent = "wind " + windSpeed + "m/s";

    const clouds = result.clouds.all;
    const cloudiness = document.querySelector("#clouds-oslo");
    cloudiness.textContent = "cloudiness " + clouds + "%";

    const iconCode = result.weather[0].icon;
    const iconBox = document.querySelector("#icon-oslo");
    iconBox.src = "http://openweathermap.org/img/w/" + iconCode + ".png";

    const currentWeatherDescription = result.weather[0].description;
    const weatherDescription = document.querySelector(
      "#weather-decription-oslo"
    );
    weatherDescription.textContent = currentWeatherDescription;
    const startWeatherBox = document.querySelector("#weather-oslo");
    startWeatherBox.addEventListener("click", () => {
      window.location = "weather-city.html?searchBar=oslo";
    });
  });

fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=60.1675&lon=24.9427&appid=522a9f3cd92ded5c0f211fd40fe17e5b"
)
  .then((response) => response.json())
  .then((result) => {
    const mainTemperatureFarenheit = result.main.temp;
    const mainTemperatureCelsius = Math.round(
      mainTemperatureFarenheit - 272.15
    );

    const temperature = document.querySelector("#temperature-helsinki");
    temperature.textContent = mainTemperatureCelsius + "℃";

    const windSpeed = result.wind.speed;
    const wind = document.querySelector("#wind-helsinki");
    wind.textContent = "wind " + windSpeed + "m/s";

    const clouds = result.clouds.all;
    const cloudiness = document.querySelector("#clouds-helsinki");
    cloudiness.textContent = "cloudiness " + clouds + "%";

    const iconCode = result.weather[0].icon;
    const iconBox = document.querySelector("#icon-helsinki");
    iconBox.src = "http://openweathermap.org/img/w/" + iconCode + ".png";

    const currentWeatherDescription = result.weather[0].description;
    const weatherDescription = document.querySelector(
      "#weather-decription-helsinki"
    );
    weatherDescription.textContent = currentWeatherDescription;
    const startWeatherBox = document.querySelector("#weather-helsinki");
    startWeatherBox.addEventListener("click", () => {
      window.location = "weather-city.html?searchBar=helsinki";
    });
  });

const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", sliding);

function sliding() {
  const triggerButton = (window.innerHeight / 5) * 4;

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerButton) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}
