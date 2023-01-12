// Search city name
  // event listener for submit button, run main controller function. 
  // event listener for history buttons
  
// main controller function (search text)
// on pageLoad function () calls function rebuild list of past cities
  
// send to geo API and receive lat and lon
  // function that receives the search text. returns lon + lat from API
// Save city name and lat lon to local storage. 
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


var searchFormEl = document.querySelector('#search-form');
var APIKey = "cdd7969a2462ddcc8bdb60c4c4b732b5";
var city;


function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

