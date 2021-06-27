function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day}, ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row text-center week-forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
                <div class="weather-date">${formatDay(forecastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="30"
                />
                <div class="weather-forecast-temp">
                  <span class="weaher-forecast-max">${Math.round(
                    forecastDay.temp.max
                  )}</span> |
                  <span class="weather-forecast-min">${Math.round(
                    forecastDay.temp.min
                  )}</span>
                </div>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "96052d9ea7e0c95a2d16b35ea2a40041";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentWeather(response) {
  console.log(response.data.daily);
  document.querySelector("#mainCity").innerHTML = response.data.name;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  celciusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#weatherCondition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  document.querySelector(
    "#icon"
  ).style.backgroundImage = `url("http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png")`;

  document.querySelector("#icon").classList.add("no-border");

  getForecast(response.data.coord);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}
function searchLocation(position) {
  let apiKey = "96052d9ea7e0c95a2d16b35ea2a40041";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}
function searchCity(city) {
  let apiKey = "96052d9ea7e0c95a2d16b35ea2a40041";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#mainCity");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  console.log(search);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celciuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheiTemperature = (celciusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML =
    Math.round(fahrenheiTemperature);
}
function displayCelciusTemperature(event) {
  event.preventDefault();
  celciuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);
}

let celciusTemperature = null;
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);
let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);
let celciuslink = document.querySelector("#celcius-link");
celciuslink.addEventListener("click", displayCelciusTemperature);
