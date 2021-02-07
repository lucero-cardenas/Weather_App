function showCityTemp(cityTemp){
  let country = cityTemp.data.sys.country;
  let city = cityTemp.data.name;

  console.log(cityTemp);

  globalCity = city; //for later use of unit conversion

  let cityTitle = document.querySelector("#shown-city");
  cityTitle.innerHTML = `${city}, ${country}`;

  let temp = Math.round(cityTemp.data.main.temp);
  let newCityTemp = document.querySelector("#curr-temp");
  newCityTemp.innerHTML = `${temp}`;

  let max = Math.round(cityTemp.data.main.temp_max);
  let newMax = document.querySelector("#max");
  newMax.innerHTML = `Max: ${max}`;
  let min = Math.round(cityTemp.data.main.temp_min);
  let newMin = document.querySelector("#min");
  newMin.innerHTML = `Min: ${min}`;

  let img = cityTemp.data.weather[0].icon;
  console.log(img);
  let newImg = document.querySelector(".desc-image");
  newImg.innerHTML = icons[img];
  
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

//function forecast(cityForecast){
//  let 
//}

function changeCity(event) {
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
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemp);
  console.log(apiUrl);
  
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${newCity}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl)
  axios.get(apiUrl).then(showForecast);
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
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl)
  axios.get(apiUrl).then(showForecast);
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

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${globalCity}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemp);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${globalCity}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
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

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${globalCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemp);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${globalCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function printDate(timeStamp){
  let hours = timeStamp.getHours();
  if (hours.toString().length < 2) {
    hours = `0${hours}`;
  }
  let minutes = currentDateTime.getMinutes();
  if (minutes.toString().length < 2) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[currentDateTime.getDay()];

  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[currentDateTime.getMonth()];
  let date = currentDateTime.getDate();
  let year = currentDateTime.getFullYear();

  let changeDate = document.querySelector("#current-date-time");
  changeDate.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;
}

function forecastWeekDay(timeStamp){
  let newDate = new Date(timeStamp);
  console.log(timeStamp);
  console.log(newDate);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[newDate.getDay()]
  console.log(day);
  return `${day}`;
}

function showForecast(info){
  let forecastDay = document.querySelector("#forecast")
  forecastDay.innerHTML = null;
  let forecast = null;

  for (index = 1; index < 5; index++) {
    let newIndex = index*8
    console.log(newIndex);
    forecast = info.data.list[newIndex];
    console.log(forecast);
    let iconIndex = forecast.weather[0].icon
    forecastDay.innerHTML = forecastDay.innerHTML + `<div class="col">
               <h4>${icons[iconIndex]}</h4>
               <p class="card-text topLow"><strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°</p>
               <p class="card-text maxMin"><strong>Max</strong> Min</p>
               <p class="card-text day">${forecastWeekDay(forecast.dt*1000)}</p>
             </div>`;
  }
}

//Global variables
let apiKey = "097f9479820416d5a2f6eb074cd4d616";
let apiUrl = null;
let globalCity = null;
let celciusUnit = true;

getPosition(); //Start from your current position

//Current Date
let currentDateTime = new Date();
console.log(currentDateTime);
printDate(currentDateTime);

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

//Icons
let icons = {"01d": '<i class="fas fa-sun"></i>',
"01n": '<i class="fas fa-moon"></i>',
"02d":'<i class="fas fa-cloud-sun"></i>',
"02n": '<i class="fas fa-cloud-moon"></i>',
"03d": '<i class="fas fa-cloud"></i>',
"03n": '<i class="fas fa-cloud"></i>',
"04d": '<i class="fas fa-cloud"></i>',
"04n": '<i class="fas fa-cloud"></i>',
"09d": '<i class="fas fa-cloud-showers-heavy"></i>',
"09n": '<i class="fas fa-cloud-showers-heavy"></i>',
"10d": '<i class="fas fa-cloud-rain"></i>',
"10n": '<i class="fas fa-cloud-rain"></i>',
"11d": '<i class="fas fa-bolt"></i>',
"11n": '<i class="fas fa-bolt"></i>',
"13d": '<i class="far fa-snowflake"></i>',
"13n": '<i class="far fa-snowflake"></i>',
"50d": '<i class="fas fa-smog"></i>',
"50n": '<i class="fas fa-smog"></i>'};