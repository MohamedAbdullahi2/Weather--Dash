const searchForm = document.querySelector('#search-form');
const citySearch = document.querySelector('#city-search');
const searchContainer = document.querySelector('#search-container');
const currentHeading = document.querySelector('#current-heading');
const currentData = document.querySelector('#current-data');
const currentIcon = document.querySelector('#current-icon');
const forecastCards = document.querySelectorAll('.future-container');
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var searched = document.querySelector('.history')

const apiKey = '265a4fd3791280adfcfe116cfd6f86b2';

searchForm.addEventListener('submit', e => {
e.preventDefault();
const city = citySearch.value;
localStorage.setItem("city", city);
getWeather(city);
forecastData(city)
});

const storedCity = localStorage.getItem("city");
if (storedCity) {
citySearch.value = storedCity;
getWeather(storedCity);
forecastData(storedCity);
}

searchContainer.addEventListener("click", function(e) {
if (e.target.tagName === "P") {
citySearch.value = e.target.textContent;
localStorage.setItem("city", e.target.textContent);
getWeather(e.target.textContent);
forecastData(e.target.textContent);
}

});

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        // update current weather heading
        currentHeading.textContent = `Current Weather in ${data.name}`;
        // update current weather data
        currentData.querySelector('#temp').textContent = `Temp: ${data.main.temp} °C`;
        currentData.querySelector('#wind').textContent = `Wind: ${data.wind.speed} Kph`;
        currentData.querySelector('#humid').textContent = `Humidity: ${data.main.humidity} %`;
        // update current weather icon
        currentIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
        // add city to search history
        const cityItem = document.createElement('p');
        cityItem.textContent = city;
        searchContainer.appendChild(cityItem);
      })
      .catch(error => console.log(error));
  }
  
  
  
  
  function forecastData (city) {
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
  //const city = citySearch.value;
  // // // Fetch forescast weather data from API
  fetch(apiUrl)
  .then(function(response){
    response.json().then(function(data){
       display5Day(data);
    });
  });
  };
  
  var display5Day = function(weather){
  forecastContainerEl.textContent = ""
  forecastTitle.textContent = "5-Day Forecast:";
  
  var forecast = weather.list;
    for(var i=5; i < forecast.length; i=i+8){
   var dailyForecast = forecast[i];
    
   
   var forecastEl=document.createElement("div");
   forecastEl.classList = "card bg-primary text-light m-2";
  
   //console.log(dailyForecast)
  
   //create date element
   var forecastDate = document.createElement("h5")
   forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
   forecastDate.classList = "card-header text-center"
   forecastEl.appendChild(forecastDate);
  
   
   //create an image element
   var weatherIcon = document.createElement("img")
   weatherIcon.classList = "card-body text-center";
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
  
   //append to forecast card
   forecastEl.appendChild(weatherIcon);
   
   //create temperature span
   var forecastTempEl=document.createElement("span");
   forecastTempEl.classList = "card-body text-center";
   forecastTempEl.textContent = "Temp: " + dailyForecast.main.temp + " °C";
  
    //append to forecast card
    forecastEl.appendChild(forecastTempEl);
  
   var forecastHumEl=document.createElement("span");
   forecastHumEl.classList = "card-body text-center";
   forecastHumEl.textContent = "Humidity:" + dailyForecast.main.humidity + "  %";
  
   //append to forecast card
   forecastEl.appendChild(forecastHumEl);
  
  
   var forecastWinEl=document.createElement("span");
   forecastWinEl.classList = "card-body text-center";
   forecastWinEl.textContent = "Wind:" + dailyForecast.wind.speed + " Kph";
  
   forecastEl.appendChild(forecastWinEl)
    // console.log(forecastEl);
   //append to five day container
    forecastContainerEl.appendChild(forecastEl);
  }
  
  }
  display5Day()