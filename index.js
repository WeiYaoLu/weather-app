let API_KEY = 'd4c96df2b522411b359a525169d3843e';
//factory function to store weather API data
const wData = (name, temp, weather, windspeed, humidity) => {
    return { name, temp, weather, windspeed, humidity };
}

//gets weather based on user input
async function getWeather(location) {
    console.log(location);
    //fetchs the API data then promises to convert it to JS object
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${API_KEY}`, { mode: 'cors' });
    const weatherData = await response.json();
    let data = parseJson(weatherData);
    updateDOM(data);
}

//gets weather based on geolocation onstart
async function getWeatherLocation(lat,long){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`, {mode: 'cors'});
    const weatherData = await response.json();
    let data = parseJson(weatherData);
    updateDOM(data);
}

//grabs data from the JSON
function parseJson(weatherData) {
    console.log(weatherData);
    let name = weatherData['name'];
    let temp = weatherData['main']['temp'];
    let humidity = weatherData['main']['humidity'];
    let weather = weatherData['weather'][0];
    let windspeed = weatherData['wind']['speed'];
    const data = wData(name, temp, weather, windspeed, humidity);
    return data;
}

//module to give the button the search effect
const SearchListener = (() => {
    const search = document.getElementById('search');
    const searchBtn = document.getElementById('addButton');
    const searchLocation = () => {
        const input = search.value;
        getWeather(input);
        return (search.value = "");
    };
    console.log(search.value);
    return searchBtn.addEventListener('click', searchLocation);
})();

//creates the div to display all the data and removes preexisting 
function updateDOM(data) {
    removeDOM();

    console.log(data);
    const container = document.querySelector('.container');

    const display = document.createElement('div');
    display.classList.add('display');

    const name = document.createElement('div');
    name.textContent = data.name;
    display.appendChild(name);

    const temp = document.createElement('h1');
    temp.classList.add('temp');
    temp.textContent = Math.round(data.temp - 273.15) + "°C";
    display.appendChild(temp);

    const weather = document.createElement('div');
    weather.textContent = "Weather: " + data.weather.main;
    display.appendChild(weather);


    const windspeed = document.createElement('div');
    windspeed.textContent = "Wind Speed: " + data.windspeed + "mph";
    display.appendChild(windspeed);


    const humidity = document.createElement('div');
    humidity.textContent = "Humidity: " + data.humidity + "%";
    display.appendChild(humidity);

    container.append(display);
}

//remove previously existing weather
const removeDOM = () => {
    const container = document.querySelector('.container');
    const display = document.querySelector('.display');
    container.removeChild(display);
}

//gets location of user
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,noGeo);
    }
}

function noGeo(){
    const display = document.querySelector('.display');
    display.textContent = "Geolocation disabled or is not supported by the browser";
}

//on success, callback function for getLocation
function showPosition(position) {
    getWeatherLocation(position.coords.latitude,position.coords.longitude);
}

//when the page is loaded, asks for location
window.onload = () => {
    getLocation();
}
