function showCityTemp(cityTemp){
  let country = cityTemp.data.sys.country;
  let city = cityTemp.data.name;

  let temp = Math.round(cityTemp.data.main.temp);
  let wind = cityTemp.data.wind.speed;
  let humidity = cityTemp.data.main.humidity;
  let cityTitle = document.querySelector("#shown-city");
  cityTitle.innerHTML = `${city}, ${country}`;
  let newCityTemp = document.querySelector("#curr-temp");
  newCityTemp.innerHTML = `${temp}`;
  let newWind = document.querySelector("#wind");
  newWind.innerHTML = `Wind speed: ${wind}`;
  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = `Humidity: ${humidity}`;
}

function changeCity (event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input");
  newCity = newCity.value; // to get the string from the #city-input form
  newCity = newCity.trim();
  //newCity = newCity.toLowercase();
  let apiKey = "097f9479820416d5a2f6eb074cd4d616";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=${units}&appid=${apiKey}`
  axios.get(apiUrl).then(showCityTemp);
}

function myPosition(position){
  console.log(position.coords);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "097f9479820416d5a2f6eb074cd4d616";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`
  axios.get(apiUrl).then(showCityTemp);
}
function getPosition(){
  navigator.geolocation.getCurrentPosition(myPosition);
}

function changeUnitToF(event){
  event.preventDefault();
  let cLink = document.querySelector("#unit-c");
  cLink.classList.remove("strong");
  let flink = document.querySelector("#unit-f");
  flink.classList.add("strong");
  let newUnitTemp = document.querySelector("#curr-temp");
  newUnitTemp = Number(newUnitTemp);
  newUnitTemp.innerHTML = (newUnitTemp - 32) * 5/9;
}

function changeUnitToC(event){
  event.preventDefault();
  let fLink = document.querySelector("#unit-f");
  fLink.classList.remove("strong");
  let clink = document.querySelector("#unit-c");
  clink.classList.add("strong");
  let newUnitTemp = document.querySelector("#curr-temp");
  newUnitTemp = Number(newUnitTemp);
  newUnitTemp.innerHTML = newUnitTemp * 9/5 + 32;
}

//Current Date
let currentDateTime = new Date();
let hours = currentDateTime.getHours();
let minutes = currentDateTime.getMinutes();
let days = ["Sun", "Mon", "Tue", "Thu", "Fri", "Sat"];
let day = days[currentDateTime.getDay()];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[currentDateTime.getMonth()];
let date = currentDateTime.getDate();
let year = currentDateTime.getFullYear();

let changeDate = document.querySelector("#current-date-time");
changeDate.innerHTML = `Today - ${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

//City Lookup
let submitCity = document.querySelector("#city-search-form");
submitCity.addEventListener("submit", changeCity);

//Current Location
let currentLoc = document.querySelector("#current_location");
currentLoc.addEventListener("click", getPosition);

//3rd Step
let unitToF = document.querySelector ("#unit-f");
unitToF.addEventListener("click", changeUnitToF);

let unitToC = document.querySelector ("#unit-c");
unitToC.addEventListener("click", changeUnitToC);