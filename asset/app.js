
const searchForm = document.querySelector('#search-form');
const citySearch = document.querySelector('#city-search');
const searchContainer = document.querySelector('#search-container');
const currentHeading = document.querySelector('#current-heading');
const currentData = document.querySelector('#current-data');
const currentIcon = document.querySelector('#current-icon');
const forecastCards = document.querySelectorAll('.future-container');

const apiKey = '265a4fd3791280adfcfe116cfd6f86b2';

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const city = citySearch.value;
  getWeather(city);
});

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      // update current weather heading
      currentHeading.textContent = `Current Weather in ${data.name}`;
      // update current weather data
      currentData.querySelector('#temp').textContent = `Temp: ${data.main.temp}`;
      currentData.querySelector('#wind').textContent = `Wind: ${data.wind.speed}`;
      currentData.querySelector('#humid').textContent = `Humidity: ${data.main.humidity}`;
      // update current weather icon
      currentIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
      // add city to search history
      const cityItem = document.createElement('p');
      cityItem.textContent = city;
      searchContainer.appendChild(cityItem);
    })
    .catch(error => console.log(error));
}




// const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apikey}`;

// // // Fetch forescast weather data from API
// fetch(apiUrl)
//    .then(response => response.json())
//    .then(data => {

//     console.log(data)

// for (let i = 0; i < 5; i++) {

// //console.log(data.list[i])
// }})

