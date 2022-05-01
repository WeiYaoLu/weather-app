let API_KEY = 'd4c96df2b522411b359a525169d3843e';
const wData = (temp, weather) => {
    return { temp, weather };
}

async function getWeather(location) {
    console.log(location);
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${API_KEY}`, { mode: 'cors' });
    const weatherData = await response.json();
    let temp = weatherData['main']['temp'];
    let weather = weatherData['weather'][0];
    const data = wData(temp, weather);
    update(data)
}
function parseJson(weatherData) {
    let temp = weatherData['main']['temp'];
    let weather = weatherData['weather'][0];
    const data = wData(temp, weather);
    return data;
}

const listener = (() => {
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
    console.log(data);
    const display = document.querySelector('.display');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    div1.textContent = data.temp;
    div2.textContent = data.weather.description;
    

}
