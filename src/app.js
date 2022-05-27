let currentDateTime = new Date();

let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[currentDateTime.getDay()];
let hours = currentDateTime.getHours();
let minutes = currentDateTime.getMinutes().toString();

h2.innerHTML = `${day} ${hours}:${minutes.padStart(2, "0")}`;

let searchButton = document.querySelector("#submit-button");
let geolocationButton = document.querySelector("#geolocation-button");
searchButton.addEventListener("click", searchTemperature);
geolocationButton.addEventListener("click", geolocationButtonClick);

let celsiusTempButton = document.querySelector("#celsiusButton");
celsiusTempButton.addEventListener("click", showDegreeCelsius);

function searchTemperature(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  getWeather(searchInput.value);
}

function geolocationButtonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  getWeather(null, position.coords);
}

function getWeather(q, coords) {
  let apiKey = "36b22067e3dcdcc365ae1ae08b781c20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
  if (q === null) {
    let lat = coords.latitude;
    let lon = coords.longitude;
    apiUrl = `${apiUrl}&lat=${lat}&lon=${lon}`;
  } else {
    apiUrl = `${apiUrl}&q=${q}`;
  }
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("#current-degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#location-name").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}
