const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

document.getElementById('getForecast').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        getWeatherForecast(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function getWeatherForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '200') {
            displayForecast(data.list.slice(0, 12)); // Display next 12 hours of forecast
        } else {
            alert('City not found.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching the weather data.');
    }
}

function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    forecastData.forEach((hourData) => {
        const time = new Date(hourData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = hourData.main.temp.toFixed(1);
        const description = hourData.weather[0].description;

        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
      <div>${time}</div>
      <div>${temp}°C</div>
      <div>${description}</div>
    `;

        forecastContainer.appendChild(forecastItem);
    });
}
