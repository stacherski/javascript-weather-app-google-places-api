//Create Weather app using openeathermap.org

import { config } from "./config.js";

//select element to be used with places search
const searchElement = document.querySelector("[data-search-box]");
const searchBox = new google.maps.places.SearchBox(searchElement);
//add listener
searchBox.addListener("places_changed", () => {
  //extract data
  const place = searchBox.getPlaces()[0];
  //return nothing when empty
  if (place == null) return;
  //find lat & lon
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  //fetch data
  fetchData(latitude, longitude);
});

const resolveWindDirection = (direction) => {
  const windDirections = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  let val = Math.round(direction / 22.5 + 0.5);
  return windDirections[val];
};
const weatherIcon = document.querySelector("[data-weather-icon]");
const weatherForecast = document.querySelector("[data-weather-forecast]");
const weatherLocation = document.querySelector("[data-weather-location]");
const weatherWind = document.querySelector("[data-weather-wind]");
const weatherTemp = document.querySelector("[data-weather-temp]");
const weatherSun = document.querySelector("[data-weather-sun]");
const cityWeather = (data) => {
  console.log(data);
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/>`;
  weatherForecast.textContent = data.weather[0].main;
  weatherLocation.textContent = data.name;
  weatherWind.textContent =
    `${data.wind.speed} m/s ` + resolveWindDirection(data.wind.deg);
  weatherTemp.textContent = `${data.main.temp} °C`;
  let sunrise = new Date(data.sys.sunrise * 1000);
  let sunset = new Date(data.sys.sunset * 1000);

  weatherSun.textContent = `${sunrise.getHours()}:${sunrise.getMinutes()} / ${sunset.getHours()}:${sunset.getMinutes()}`;
};

//fetch data from API
const fetchData = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pl&units=metric&appid=${config.OPENWEATHER_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      cityWeather(data);
    })
    .catch((err) => console.error(err));
};
