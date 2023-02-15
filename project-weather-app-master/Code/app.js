const weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ba39a634841efd509a1c7b07a0c59e68";  
const weatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ba39a634841efd509a1c7b07a0c59e68";
const temperatureDescription = document.getElementById("temp-description");
const sunsetSunrise = document.getElementById("sunset-sunrise");


const country = document.getElementById("country-name");
const forecast = document.getElementById("forecast");
fetch(weatherApi)
    .then((weatherResponse) => {
        console.log(`Response: ${weatherResponse}`);
        return weatherResponse.json();
    
    })
    .then((weatherData) => {
        country.innerHTML += `<div>${weatherData.name}</div>`
        let temperature = weatherData.main.temp;
        let roundedTemp = temperature.toPrecision(2);
        temperatureDescription.innerHTML += `<div>${roundedTemp}°C</div>`
        temperatureDescription.innerHTML += `<div>${weatherData.weather[0].description}</div>`
        
        const sunrise = weatherData.sys.sunrise;
        const sunset = weatherData.sys.sunset;

        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});

        sunsetSunrise.innerHTML += `<div>Sunrise: ${sunriseTime}</div>`;
        sunsetSunrise.innerHTML += `<div>Sunset: ${sunsetTime}</div>`;    
        
    });
fetch(weatherForecast)
    .then((forecastResponse) => {
        console.log(`Forecast response: ${forecastResponse}`)
        return forecastResponse.json()
    })
    .then((forecastData) => {
        let a = 0;
        a = forecastData.list[0].dt;
        const options = { weekday: "long" };
        for(let i= 1; i <=5 ;i++) {

            a += 86400;
        
            let startingDate = new Date(a * 1000)
            let finishedDate = startingDate.toLocaleDateString(undefined, options)
            
             forecast.innerHTML += `<div>${finishedDate}</div>`
           
            
            
        }

    })