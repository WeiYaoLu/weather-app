let API_KEY = 'd4c96df2b522411b359a525169d3843e';
const wData = (name,temp, weather,windspeed,humidity) => {
    return {name,temp, weather,windspeed,humidity};
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
    const data = wData(name,temp, weather,windspeed,humidity);
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
    return searchBtn.addEventListener('click',searchLocation);
})();

function updateDOM(data){
    removeDOM();
    console.log(data);
    const display = document.querySelector('.display');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const div5 = document.createElement('div');
    div1.textContent = data.name; 
    div2.textContent = "Temperature: " + Math.round(data.temp - 273.15) + "C";
    div3.textContent = "Weather: " + data.weather.main ;
    div4.textContent = "Wind Speed: " +  data.windspeed;
    div5.textContent = "Humidity: " + data.humidity;

    display.appendChild(div1);
    display.appendChild(div2);
    display.appendChild(div3);
    display.appendChild(div4);
    display.appendChild(div5);

}

const removeDOM = () => {
    display = document.querySelector('.display');
    console.log(display);
    for(let i = 0; i < display.length; i++){

    }
}
