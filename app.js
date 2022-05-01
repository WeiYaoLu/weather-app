let API_KEY = 'd4c96df2b522411b359a525169d3843e';
const wData = (name, temp, weather, windspeed, humidity) => {
    return { name, temp, weather, windspeed, humidity };
}

async function getWeather(location) {
    console.log(location);
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${API_KEY}`, { mode: 'cors' });
    const weatherData = await response.json();
    let data = parseJson(weatherData);
    updateDOM(data);
}
function parseJson(weatherData) {
    let name = weatherData['name'];
    let temp = weatherData['main']['temp'];
    let humidity = weatherData['main']['humidity'];
    let weather = weatherData['weather'][0];
    let windspeed = weatherData['wind']['speed'];
    const data = wData(name, temp, weather, windspeed, humidity);
    return data;
}

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

function updateDOM(data) {
    removeDOM();
    console.log(data);
    const container = document.querySelector('.container');
    console.log(container);
    const display = document.createElement('div');
    display.classList.add('display');
    const name = document.createElement('div');
    
    const temp = document.createElement('h1');
    temp.classList.add('temp');
    const weather = document.createElement('div');
    const windspeed = document.createElement('div');
    const humidity = document.createElement('div');
    name.textContent = data.name;
    temp.textContent = Math.round(data.temp - 273.15) + "°C";
    weather.textContent = "Weather: " + data.weather.main;
    windspeed.textContent = "Wind Speed: " + data.windspeed + "mph";
    humidity.textContent = "Humidity: " + data.humidity + "%";

    container.append(display);
    display.appendChild(name);
    display.appendChild(temp);
    display.appendChild(weather);
    display.appendChild(windspeed);
    display.appendChild(humidity);

}

const removeDOM = () => {
    const container = document.querySelector('.container');
    const display = document.querySelector('.display');
    container.removeChild(display);
}

getWeather('Oakland');
