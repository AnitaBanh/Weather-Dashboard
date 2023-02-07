// Search city name
// event listener for submit button, run main controller function.
var searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  handleSearchFormSubmit();
});
// event listener for history buttons

// main controller function (search text)
// on pageLoad function () calls function rebuild list of past cities
// document.onload; //= insert function to load
// send to geo API and receive lat and lon
// function that receives the search text. returns lon + lat from API

// Save city name and lat lon to local storage.
var cities = [];
function storeCityHistory(city) {
  if (JSON.parse(localStorage.getItem("cities")) != null) {
    cities = JSON.parse(localStorage.getItem("cities"));
    cities.push(city);
  }
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
  // renderCities();
  console.log(cities);
}
// function to append to array in local storage
// rebuild list of past cities searched from local storage
// function that reads local storage array and rebuilds history as button list. call this function after each new search.

function rebuildHistory() {
  var searchHistoryDiv = document.getElementById("search-history-container");
  var storedSearches = JSON.parse(localStorage.getItem("cities"));
  removeAllChildNodes(searchHistoryDiv);
  for (let i = 0; i < storedSearches.length; i++) {
    let newChild = document.createElement("button");
    newChild.setAttribute("content", "test content");
    newChild.setAttribute("class", "button is-fullwidth");
    newChild.textContent = storedSearches[i].itemSearched;
    searchHistoryDiv.appendChild(newChild);

    newChild.addEventListener("click", function () {
      console.log (newChild.innerHTML);
    });
      }
    }
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
var currentWeather = document.querySelector("#curWeather")
var currentCity = document.querySelector("#curCity")
var searchInputField = document.querySelector("#search-input")

function handleSearchFormSubmit() {
  // put reset here
  if (searchInputField.value == "") {
    console.error("Please enter a city to search!");
    return;
  }
  console.log(searchInputField.value);
  storeCityHistory()
  // call next function (API fetch)
  loadDataLonLat(searchInputField.value);
  storeCityHistory();
  rebuildHistory();
  // fetchFiveDay();
  
}

function loadDataLonLat(city) {
  var apiURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=" + APIKey;
  console.log(city);
  fetch(apiURL).then(function(response) {
    if (response.ok) {
      return response.json().then(function (data) {
        console.log(data);
        var storedLon = data[0].lon;
        var storedLat = data[0].lat;
        fetchCurrentWeather(storedLat, storedLon);
        // fetchFiveDay(storedLat, storedLon);
       fetchFiveDay(storedLat, storedLon);
        console.log(data[0].lon);
        console.log(data[0].lat);})
        
        // localStorage.setItem("lon", JSON.stringify(data[0].lon));
        // localStorage.setItem("lat", JSON.stringify(data[0].lat));
      
    }
  })
        
}




function fetchCurrentWeather(storedLat, storedLon) { 
  console.log(storedLat);
  console.log(storedLon);
  var curWeatherAPIURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + storedLat + "&lon=" + storedLon + "&appid=" + APIKey + "&units=imperial";
  fetch(curWeatherAPIURL).then(function(response){
    if(response.ok) {
      return response.json().then(function(data){
        // console.log(data);
        // console.log(data.main.temp);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // console.log(data.weather[0].icon);
        currentCity.textContent = data.name + " Current Weather";
document.getElementById("curTemp").textContent = "Temperature (F): " + data.main.temp
document.getElementById("curWind").textContent = "Wind Speed (mph): " + data.wind.speed
document.getElementById("curHumidity").textContent = "% Humidity: " + data.main.humidity

        let iconCode = data.weather[0].icon;
        var currentWeatherIcon = document.getElementById("curIcon");
        currentWeatherIcon.src = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

        localStorage.setItem("searchedCityName", JSON.stringify(data.name));

      })
    }
  })
}

function fetchFiveDay(storedLat, storedLon) {
  var forecastAPIURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + storedLat + "&lon=" + storedLon + "&appid=" + APIKey + "&units=imperial";
  fetch(forecastAPIURL).then(function(response){
    if(response.ok) {
      return response.json().then(function(data){
        console.log(data);
        console.log(data.list[0].dt_txt);
        console.log(data.list[0].weather[0].icon);
        console.log(data.list[0].main.temp);
        console.log(data.list[0].wind.speed);
        console.log(data.list[0].main.humidity);
      //  function fiveDays 
//         document.getElementById("forecast-temp-1").textContent = "Temperature (F): " + data.list[0].main.temp;
// document.getElementById("forecast-wind-1").textContent = "Wind Speed (mph): " + data.wind.speed;
// document.getElementById("forecast-humidity-1").textContent = "% Humidity: " + data.main.humidity;

//         let iconCode = data.weather[0].icon;
//         var currentWeatherIcon = document.getElementById("imageForecast1");
//         currentWeatherIcon.src = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        })
      }
    })
  }
//if dt_txt is day 1 then


//weather icon src = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"

// function weatherDash() {
//   currentWeather.textContent = curCitySearch;
// }

// savedCityName.forEach(element => {
  
// });
// if (response.ok) {
//   response.json().then(function(data) {
//    weatherdash(data, city); // why does this break everything??

//   });

// create weatherDash function - append data to today on page, store lat lon, call next function that uses 2nd API, pass in lat lon.

// searchFormEl.addEventListener("submit",handleSearchFormSubmit ) => {
// }
// function rebuildHistory() {
//   var searchHistoryDiv = document.getElementById("search-history-container");
//   var storedSearches = JSON.parse(localStorage.getItem("cities"));
//   removeAllChildNodes(searchHistoryDiv);
//   for (let i = 0; i < storedSearches.length; i++) {
//     let newChild = document.createElement("button");
//     newChild.setAttribute("content", "test content");
//     newChild.setAttribute("class", "button is-fullwidth");
//     newChild.textContent = storedSearches[i].itemSearched;
//     searchHistoryDiv.appendChild(newChild);

//     newChild.addEventListener("click", function () {
//       console.log (newChild.innerHTML);
          // loadDataLonLat(newChild.innerHTML);
//       if ((newChild.innerHTML === "Bourbon")) {
//         displayBourbonDrinks();
//       } else if ((newChild.innerHTML === "Vodka")) {
//         displayVodkaDrinks();
//       } else if ((newChild.innerHTML === "Rum")) {
//         displayRumDrinks();
//       }
//     });
//   }
// }
