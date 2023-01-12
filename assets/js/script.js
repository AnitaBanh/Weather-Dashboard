// Search city name
// event listener for submit button, run main controller function.
// event listener for history buttons

// main controller function (search text)
// on pageLoad function () calls function rebuild list of past cities

// send to geo API and receive lat and lon
// function that receives the search text. returns lon + lat from API
// Save city name and lat lon to local storage.
var cities = []

function storeCityHistory(city) {
  if (JSON.parse(localStorage.getItem("cities")) != null) {
      cities = JSON.parse(localStorage.getItem("cities"));
  }
  cities.push(city);
  localStorage.setItem('cities', JSON.stringify(cities));
  renderCities();
  console.log (cities)
}
// function to append to array in local storage
// rebuild list of past cities searched from local storage
// function that reads local storage array and rebuilds history as button list. call this function after each new search.
// fetch weather conditions for current and future 5 days
// function that passes coordinates to weather API and fetches 5 day conditions. returns API response
// parse API response update html elements
// function (parse results) return(array with 4 fields)
// function (weather description e.g. rain, sun) returns image src
// function (array with 4 fields) update page
// history click listener retriggers a search
// function (text from history button) call first function that receives search text.

var searchFormEl = document.querySelector("#search-form");
var APIKey = "cdd7969a2462ddcc8bdb60c4c4b732b5";
var currentWeather = document.querySelector('curWeather')

function handleSearchFormSubmit(event) {
  event.preventDefault();
  // put reset here
var curCitySearch = document.querySelector("#search-input").value;

  if (!curCitySearch) {
    console.error("Please enter a city to search!");
    return;
  }
  console.log(curCitySearch);
  // call next function (API fetch)
  loadData(curCitySearch);
}

function loadData(curCitySearch) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q="+ curCitySearch +",USA&APPID=cdd7969a2462ddcc8bdb60c4c4b732b5";
  console.log(curCitySearch);

  fetch(apiURL)
  .then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        curCitySearch
        // weatherDash(data, city);
        console.log (data);
        console.log (response);
      });
    }
  });
}

function weatherDash() {
  currentWeather.textContent = (curCitySearch)
}
// if (response.ok) {
//   response.json().then(function(data) {
//    weatherdash(data, city); // why does this break everything?? 
    
//   });

// create weatherDash function - append data to today on page, store lat lon, call next function that uses 2nd API, pass in lat lon. 

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
