document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const cityInput = document.getElementById('city');

    // Create a div to show weather results
    let resultDiv = document.createElement('div');
    resultDiv.id = 'weather-result';
    form.parentNode.insertBefore(resultDiv, form.nextSibling);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city === "") {
            resultDiv.textContent = "Please enter a city name.";
            return;
        }
        // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=YOUR_API_KEY&units=metric`)
            .then(response => {
                if (!response.ok) throw new Error("City not found");
                return response.json();
            })
            .then(data => {
                resultDiv.innerHTML = `
                    <h3>Weather in ${data.name}</h3>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
            })
            .catch(error => {
                resultDiv.textContent = "Error: " + error.message;
            });
    });
});
