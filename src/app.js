function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
      <div class="col-5">${day}<br />April 28</div>
        <div class="col-3"><img src="images/partly_cloudy.png"></div>
        <div class="col-3 column-temp text-end">
          <span class="extended-forecast-temp-max"> 18° </span>
        </div>
                <div class="col-1 column-temp text-start">
          <span class="extended-forecast-temp-min"> 9° </span>
                </div>
                </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function searchTemperature(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  getWeather(searchInput.value);
}

function getWeather(city) {
  let apiKey = "36b22067e3dcdcc365ae1ae08b781c20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("#current-degree").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#location-name").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "36b22067e3dcdcc365ae1ae08b781c20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showFahrenheitTemp(event) {
  event.preventDefault();

  celsiusButton.classList.remove("degree-active");
  fahrenheitButton.classList.add("degree-active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-degree").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusButton.classList.add("degree-active");
  fahrenheitButton.classList.remove("degree-active");
  document.querySelector("#current-degree").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
showForecast();

let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("click", searchTemperature);

let fahrenheitButton = document.querySelector("#fahrenheitButton");
fahrenheitButton.addEventListener("click", showFahrenheitTemp);

let celsiusButton = document.querySelector("#celsiusButton");
celsiusButton.addEventListener("click", showCelsiusTemp);
