const urlKeysValues = window.location.search;
const paramsUrl = new URLSearchParams(urlKeysValues);
const paramsCity = paramsUrl.get("searchBar");
const navigationButton = document.querySelector("#navigation-button");
const searchBar = document.querySelector("#search-bar");

searchBar.value = paramsCity;

// save latest search
const arrayStorage =
  JSON.parse(sessionStorage.getItem("lastSearchValue")) || [];

const saveLastSearchValue = () => {
  if (arrayStorage[arrayStorage.length - 1] !== searchBar.value) {
    arrayStorage.push(searchBar.value);
  }
  sessionStorage.setItem("lastSearchValue", JSON.stringify(arrayStorage));
};

const renderLastSearchValues = () => {
  const valueFromSessionStorage =
    JSON.parse(sessionStorage.getItem("lastSearchValue")) || [];
  const lastCityName = document.querySelector("#latest-search-city-name");
  lastCityName.innerHTML = "";

  if (valueFromSessionStorage.length > 0) {
    const addButtons = (searchedCity) => {
      const inputButton = document.createElement("input");
      inputButton.setAttribute("type", "button");
      inputButton.setAttribute("value", searchedCity);
      inputButton.className = "input-button";
      lastCityName.appendChild(inputButton);
      inputButton.textContent = searchedCity;

      inputButton.addEventListener("click", (event) => {
        searchBar.value = event.target.value;
        window.scrollTo({ top: 300, behavior: "smooth" });
      });
    };
    if (valueFromSessionStorage.length > 3) {
      const resultSlice = valueFromSessionStorage.slice(
        valueFromSessionStorage.length - 3,
        valueFromSessionStorage.length
      );
      resultSlice.forEach(addButtons);
    } else {
      valueFromSessionStorage.forEach(addButtons);
    }
  }
};

//Chart js
let myChart = null;

const pollusionChart = (result) => {
  const no2 = result.list[0].components.no2;
  const o3 = result.list[0].components.o3;
  const pm2_5 = result.list[0].components.pm2_5;
  const pm10 = result.list[0].components.pm10;

  const aqiInformation = document.querySelector("#aqi-information");
  const aqiIndex = document.querySelector("#aqi-index");
  const aqiInfoCategory = document.querySelector("#aqi-info-category");

  const polusion = result.list[0].main.aqi;

  aqiIndex.textContent = "AQI:" + polusion;

  if (polusion === 1) {
    aqiInformation.style.backgroundColor = "#9FD379";
    aqiInfoCategory.textContent = "Good";
  }

  if (polusion === 2) {
    aqiInformation.style.backgroundColor = "#F9D76D";
    aqiInfoCategory.textContent = "Fair";
  }

  if (polusion === 3) {
    aqiInformation.style.backgroundColor = "#F59662";
    aqiInfoCategory.textContent = "Moderate";
  }

  if (polusion === 4) {
    aqiInformation.style.backgroundColor = "#F15156";
    aqiInfoCategory.textContent = "Poor";
  }

  if (polusion >= 5) {
    aqiInformation.style.backgroundColor = "#a42929";
    aqiInformation.style.color = "#eee";
    aqiInfoCategory.textContent = "Very Poor";
  }

  const ctx = document.getElementById("myChart").getContext("2d");

  if (myChart !== null) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["no2", "o3", "pm2.5", "pm10"],
      datasets: [
        {
          data: [no2, o3, pm2_5, pm10],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
};

// searched city name
let city = document.querySelector("#city");
const cityNameWeather = (result) => {
  const lat = result[0].lat;
  const lon = result[0].lon;
  let cityName = result[0].name;

  city.textContent = cityName;
  return { lat, lon };
};

const weatherData = (result) => {
  const mainTemperatureFarenheit = result.main.temp;
  const feelsLikeTemperatureFarenheit = result.main.feels_like;
  const minTemperatureFarenheit = result.main.temp_min;
  const maxTemperatureFarenheit = result.main.temp_max;

  const mainTemperatureCelsius = Math.round(mainTemperatureFarenheit - 272.15);
  const feelsLikeTemperatureCelsius = Math.round(
    feelsLikeTemperatureFarenheit - 272.15
  );
  const minTemperatureCelsius = Math.round(minTemperatureFarenheit - 272.15);
  const maxTemperatureCelsius = Math.round(maxTemperatureFarenheit - 272.15);

  const temperature = document.querySelector("#temperature");
  temperature.textContent = mainTemperatureCelsius + "℃";

  const feelsLike = document.querySelector("#feels-like");
  feelsLike.textContent = "Feels Like " + feelsLikeTemperatureCelsius + "℃";

  const minTemp = document.querySelector("#min-temp");
  minTemp.textContent = "Min " + minTemperatureCelsius + "℃";

  const maxTemp = document.querySelector("#max-temp");
  maxTemp.textContent = "Max " + maxTemperatureCelsius + "℃";

  const windSpeed = result.wind.speed;
  const wind = document.querySelector("#wind");
  wind.textContent = "wind " + windSpeed + "m/s";

  const clouds = result.clouds.all;
  const cloudiness = document.querySelector("#clouds");
  cloudiness.textContent = "cloudiness " + clouds + "%";

  const iconCode = result.weather[0].icon;
  const iconBox = document.querySelector("#icon");
  iconBox.src = "http://openweathermap.org/img/w/" + iconCode + ".png";

  const currentWeatherDescription = result.weather[0].description;
  const weatherDescription = document.querySelector("#weather-decription");
  weatherDescription.textContent = currentWeatherDescription;
};

const getDay = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date(date);
  let day = days[d.getDay()];
  return day;
};

const renderForecastData = (result) => {
  const data = result.list;

  // https://www.youtube.com/watch?v=s1XVfm5mIuU&ab_channel=WebDevSimplified
  const groupedDates = data.reduce((newDateObject, dateObject) => {
    const dateText = dateObject.dt_txt;
    const date = dateText.substring(0, 11);
    const day = getDay(date);
    // oject key hämtar alla nycklar i newdateObject och finns nu en array med strängar sen kollar ja om day finns inns i arrayen
    if (Object.keys(newDateObject).includes(day)) {
      // den har en dag som matchar nuvarande dateObject
      return { ...newDateObject, [day]: [...newDateObject[day], dateObject] }; // Detta lägger till vädrets data på rätt dag
    } else {
      // den har ingen dag
      return { ...newDateObject, [day]: [dateObject] }; // Detta lägger till dagarna
    } // kopierar min accimulator och skapar ett ny key som är day som innehåller  dateObjectis i en array
  }, {});

  //gör om objectet till en array med arrayer som har nycklar och värden i sig
  Object.entries(groupedDates).forEach(([key, value]) => {
    const weekday = key;
    const weatherForecastDiv = document.querySelector("#weather-forecast");
    const div2 = document.createElement("div");
    const weekdayName = document.createElement("h3");
    weatherForecastDiv.appendChild(div2);
    div2.appendChild(weekdayName);
    div2.className = "div2";
    weekdayName.textContent = weekday;

    for (let i = 0; i < value.length; i++) {
      const div1 = document.createElement("div");
      div1.className = "div1";

      const timeElement = document.createElement("p");
      timeElement.className = "time-forecast";
      const tempElement = document.createElement("p");
      tempElement.className = "temp-forecast";
      const weatherDiv = document.createElement("div");
      weatherDiv.className = "weather-div";
      const weatherImg = document.createElement("img");
      weatherImg.className = "weather-img";
      const weatherElement = document.createElement("p");

      div2.appendChild(div1);

      div1.appendChild(timeElement);
      div1.appendChild(tempElement);
      div1.appendChild(weatherDiv);
      weatherDiv.appendChild(weatherImg);
      weatherDiv.appendChild(weatherElement);

      const dateTime = value[i].dt_txt;
      const time = dateTime.substring(11, 16);
      const date = dateTime.substring(0, 11);
      const mainTemperatureFarenheit = value[i].main.temp;
      const mainTemperatureCelsius = Math.round(
        mainTemperatureFarenheit - 272.15
      );
      const iconCode = value[i].weather[0].icon;
      const currentWeatherDescription = value[i].weather[0].description;

      timeElement.textContent = time;
      tempElement.textContent = mainTemperatureCelsius + "℃";
      weatherImg.src = "http://openweathermap.org/img/w/" + iconCode + ".png";
      weatherElement.textContent = currentWeatherDescription;
    }
  });
};

const submitFunction = () => {
  const newURL = new URL(window.location.href);
  newURL.search = "?searchBar=" + searchBar.value;
  window.history.pushState({ path: newURL.href }, "", newURL.href);
  //https://stackoverflow.com/questions/10970078/modifying-a-query-string-without-reloading-the-page

  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      searchBar.value +
      "&appid=522a9f3cd92ded5c0f211fd40fe17e5b"
  )
    .then((response) => response.json())
    .then((result) => {
      const { lat, lon } = cityNameWeather(result);

      //Weather
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=522a9f3cd92ded5c0f211fd40fe17e5b"
      )
        .then((response) => response.json())
        .then((result) => {
          weatherData(result);
        });

      // forcast
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=522a9f3cd92ded5c0f211fd40fe17e5b"
      )
        .then((response) => response.json())
        .then((result) => {
          renderForecastData(result);
        });

      // Pollusion
      fetch(
        "http://api.openweathermap.org/data/2.5/air_pollution?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=522a9f3cd92ded5c0f211fd40fe17e5b"
      )
        .then((response) => response.json())
        .then((result) => {
          pollusionChart(result);
        });
    });
  // lastSearchValue();

  renderLastSearchValues();
  saveLastSearchValue();
};

submitFunction();

navigationButton.addEventListener("click", submitFunction);

// Event key press Enter
window.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    submitFunction();
  }
});

// animation
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

// Temperature event on arrow
const arrow = document.querySelector("#arrow");
const arrowBox = document.querySelector("#arrow-box");
arrowBox.style.display = "none";

arrow.addEventListener("click", (event) => {
  if (arrowBox.style.display === "none") {
    arrowBox.style.display = "block";
    arrow.classList = "bi-caret-up";

    weatherForecastDiv.style.display = "none";
    arrowForecast.classList = ("class", "bi-caret-up");
  } else {
    arrowBox.style.display = "none";
    arrow.classList = "bi-caret-down";
  }
});

// 5 days forecast event on button
const arrowForecast = document.querySelector("#arrow-forecast");
const dropDownWeather = document.querySelector("#drop-down-weather");
const weatherForecastDiv = document.querySelector(
  "#weather-forecast-container"
);

weatherForecastDiv.style.display = "none";

dropDownWeather.addEventListener("click", (event) => {
  if (weatherForecastDiv.style.display === "none") {
    weatherForecastDiv.style.display = "block";
    arrowForecast.classList = ("class", " bi-caret-down");

    arrowBox.style.display = "none";
    arrow.classList = "bi-caret-down";
  } else {
    weatherForecastDiv.style.display = "none";
    arrowForecast.classList = ("class", "bi-caret-up");
  }
});

// https://www.youtube.com/watch?v=CZP1iQFQjEY&ab_channel=WebStylePress
