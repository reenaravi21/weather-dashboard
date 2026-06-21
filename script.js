const apiKey = "322b3ae882972ad0d273d846b9225e95";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

async function getWeather(city) {
    try {

        weatherResult.innerHTML = "<p>Loading...</p>";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        // API errors handle
        if (data.cod != 200) {
            throw new Error(data.message);
        }

        weatherResult.innerHTML = `
        <div class="weather-card">
            <h2>${data.name}</h2>
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
            <p>☁ Weather: ${data.weather[0].description}</p>
        </div>
        `;

    } catch(error) {

        weatherResult.innerHTML = `
        <p style="color:red;">
            ${error.message}
        </p>
        `;
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city){
        getWeather(city);
    }
});
