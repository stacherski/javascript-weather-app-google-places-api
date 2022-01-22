//Create Weather app using openeathermap.org

import { config } from "./config.js";

let weather = [];
let cities = ["Wrocław", "Łódź", "acapulco", "Kopenhaga", "New York"];
const app = document.getElementById("app");

const resolveWindDirection = (direction) => {
  if (direction >= 0 && direction <= 11) return "N";
  if (direction >= 12 && direction <= 33) return "NNE";
  if (direction >= 34 && direction <= 56) return "NE";
  if (direction >= 57 && direction <= 78) return "ENE";
  if (direction >= 79 && direction <= 101) return "E";
  if (direction >= 102 && direction <= 123) return "ESE";
  if (direction >= 124 && direction <= 146) return "SE";
  if (direction >= 147 && direction <= 168) return "SSE";
  if (direction >= 169 && direction <= 191) return "S";
  if (direction >= 192 && direction <= 213) return "SSW";
  if (direction >= 214 && direction <= 236) return "SW";
  if (direction >= 237 && direction <= 258) return "WSW";
  if (direction >= 259 && direction <= 281) return "W";
  if (direction >= 282 && direction <= 303) return "WNW";
  if (direction >= 304 && direction <= 326) return "NW";
  if (direction >= 327 && direction <= 348) return "NNW";
  if (direction >= 349 && direction <= 359) return "N";
};

const createWeatherBox = (data) => {
  //define helpers
  let elementName;
  let elementContent;

  //create div.weatherBox
  let newDiv = document.createElement("div");
  newDiv.classList.add("weatherBox");

  //add currentTemperature
  elementName = document.createElement("div");
  elementName.classList.add("weatherBox__currentTemperature");
  elementContent = document.createTextNode(data.main.temp + " °C");
  elementName.appendChild(elementContent);
  newDiv.appendChild(elementName);

  //add cityName
  elementName = document.createElement("div");
  elementName.classList.add("weatherBox__cityName");
  elementContent = document.createTextNode(data.name);
  elementName.appendChild(elementContent);
  newDiv.appendChild(elementName);

  //add dateTime
  elementName = document.createElement("div");
  elementName.classList.add("weatherBox__dateTime");
  let dateElement = new Date(data.dt * 1000);
  elementContent = document.createTextNode(
    dateElement.toLocaleDateString("pl-PL") +
      " / " +
      dateElement.getHours() +
      ":" +
      dateElement.getMinutes()
  );
  elementName.appendChild(elementContent);
  newDiv.appendChild(elementName);

  //add windSpeed
  elementName = document.createElement("div");
  elementName.classList.add("weatherBox__windSpeed");
  elementContent = document.createTextNode(
    "Wiatr " +
      data.wind.speed +
      " m/s z kierunku " +
      resolveWindDirection(data.wind.deg)
  );
  elementName.appendChild(elementContent);
  newDiv.appendChild(elementName);

  // append box to div.app
  app.appendChild(newDiv);
};

//fetch data from API
const fetchData = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pl&units=metric&appid=${config.WEATHER_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      weather.push(data);
      createWeatherBox(data);
    })
    .catch((err) => console.error(err));
};
for (let i = 0; i < cities.length; i++) {
  fetchData(cities[i]);
}
