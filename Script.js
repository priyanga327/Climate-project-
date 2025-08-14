const cityInput = document.getElementById("cityInput");
const getWeatherButton = document.getElementById("getWeather");
const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");

getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            locationDisplay.textContent = `Location: ${data.name}, ${data.sys.country}`;
            temperatureDisplay.textContent = `Temperature: ${data.main.temp}°C`;
            descriptionDisplay.textContent = `Description: ${data.weather[0].description}`;
        } else {
            locationDisplay.textContent = "Error fetching weather data.";
            temperatureDisplay.textContent = "";
            descriptionDisplay.textContent = "";
        }
    } catch (error) {
        locationDisplay.textContent = "An error occurred.";
        temperatureDisplay.textContent = "";
        descriptionDisplay.textContent = "";
    }
}