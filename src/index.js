function showCityTemp(cityTemp){
  let country = cityTemp.data.sys.country;
  let city = cityTemp.data.name;

  globalCity = city; //for later use of unit conversion

  let cityTitle = document.querySelector("#shown-city");
  cityTitle.innerHTML = `${city}, ${country}`;

  let temp = Math.round(cityTemp.data.main.temp);
  console.log(temp);
  let newCityTemp = document.querySelector("#curr-temp");
  newCityTemp.innerHTML = `${temp}`;
  let wind = cityTemp.data.wind.speed;
  let newWind = document.querySelector("#wind");
  newWind.innerHTML = `Wind speed: ${wind}`;
  let humidity = cityTemp.data.main.humidity;
  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = `Humidity: ${humidity}`;
  
  let description = cityTemp.data.weather[0].description;
  let newDescription = document.querySelector("#description");
  newDescription.innerHTML = `Description: ${description}`;

  let feelsLike = Math.round(cityTemp.data.main.feels_like);
  let newFeelsLike = document.querySelector("#feels-like");
  newFeelsLike.innerHTML = `Feels like: ${feelsLike}`;
}

function changeCity (event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input");
  newCity = newCity.value; // to get the string from the #city-input form
  newCity = newCity.trim();
  let units = null;
  if (celciusUnit == true) {
    units = "metric";
  } else {
    units = "imperial";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=${units}&appid=${apiKey}`
  axios.get(apiUrl).then(showCityTemp);
  console.log(apiUrl);
}

function myPosition(position){
  console.log(position.coords);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = null;
  if (celciusUnit == true) {
    units = "metric";
  } else {
    units = "imperial";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`
  axios.get(apiUrl).then(showCityTemp);
  console.log(apiUrl);
}
function getPosition(){
  navigator.geolocation.getCurrentPosition(myPosition);
}

function changeUnitToF(event){
  event.preventDefault();
  celciusUnit = false; // for further searches

  let cLink = document.querySelector("#unit-c");
  cLink.classList.remove("strong");
  let flink = document.querySelector("#unit-f");
  flink.classList.add("strong");

  let fLink = document.querySelector("#unit-f");
  fLink.classList.remove("soft");
  let clink = document.querySelector("#unit-c");
  clink.classList.add("soft");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${globalCity}&units=imperial&appid=${apiKey}`
  axios.get(apiUrl).then(showCityTemp);
}

function changeUnitToC(event){
  event.preventDefault();
  celciusUnit = true; //for further searches

  let fLink = document.querySelector("#unit-f");
  fLink.classList.remove("strong");
  let clink = document.querySelector("#unit-c");
  clink.classList.add("strong");

  let cLink = document.querySelector("#unit-c");
  cLink.classList.remove("soft");
  let flink = document.querySelector("#unit-f");
  flink.classList.add("soft");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${globalCity}&units=metric&appid=${apiKey}`
  axios.get(apiUrl).then(showCityTemp);
}

//Global variables
let apiKey = "097f9479820416d5a2f6eb074cd4d616";
let globalCity = null;
let celciusUnit = true;

getPosition(); //Start from your current position

//Current Date
let currentDateTime = new Date();
let hours = currentDateTime.getHours();
if (hours.toString().length < 2) {
  hours = `0${hours}`;
}
let minutes = currentDateTime.getMinutes();
if (minutes.toString().length < 2) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Thu", "Fri", "Sat"];
let day = days[currentDateTime.getDay()];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[currentDateTime.getMonth()];
let date = currentDateTime.getDate();
let year = currentDateTime.getFullYear();

let changeDate = document.querySelector("#current-date-time");
changeDate.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

//City Lookup
let submitCity = document.querySelector("#city-search-form");
submitCity.addEventListener("submit", changeCity);

//Current Location
let currentLoc = document.querySelector("#current_location");
currentLoc.addEventListener("click", getPosition);

//Unit switch
let unitToF = document.querySelector ("#unit-f");
unitToF.addEventListener("click", changeUnitToF);

let unitToC = document.querySelector ("#unit-c");
unitToC.addEventListener("click", changeUnitToC);