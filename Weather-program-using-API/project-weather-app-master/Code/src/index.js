const weatherApi =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ba39a634841efd509a1c7b07a0c59e68";
const weatherForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ba39a634841efd509a1c7b07a0c59e68";
const temperatureDescription = document.getElementById("temp-description");
const sunsetSunrise = document.getElementById("sunset-sunrise");
const cloud = document.getElementById("cloud-svg");
const sunglasses = document.getElementById("sunglasses-svg");
const umbrella = document.getElementById("umbrella-svg");

const country = document.getElementById("country-name");
const forecast = document.getElementById("forecast");
cloud.style.display = "block";
fetch(weatherApi)
  .then((weatherResponse) => {
    return weatherResponse.json();
  })
  .then((weatherData) => {
    console.log(`Response: ${weatherData.weather[0].description}`);
    country.innerHTML += `<div>${weatherData.name}</div>`;
    let temperature = weatherData.main.temp;

    temperatureDescription.innerHTML += `<div class="temp">${temperature}°</div>`;
    temperatureDescription.innerHTML += `<div>${weatherData.weather[0].description}</div>`;

    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;

    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    sunsetSunrise.innerHTML += `<div>Sunrise: ${sunriseTime}</div>`;
    sunsetSunrise.innerHTML += `<div>Sunset: ${sunsetTime}</div>`;
    if (weatherData.weather[0].description.includes("cloud")) {
      cloud.style.display = "block";
      body.style.color = "white";
    } else if (weatherData.weather[0].description.includes("snow")) {
      body.style.background = "CadetBlue";
    } else if (weatherData.weather[0].description.includes("clear")) {
      sunglasses.style.display = "block";
      document.body.style.backgroundColor = "AntiqueWhite";
    } else if (weatherData.weather[0].description.includes("rain")) {
      umbrella.style.display = "block";
      document.body.style.backgroundColor = "LightSkyBlue";
    }
  });
fetch(weatherForecast)
  .then((forecastResponse) => {
    console.log(`Forecast response: ${forecastResponse}`);
    return forecastResponse.json();
  })
  .then((forecastData) => {
    let b = 7;
    const options = { weekday: "long" };
    for (let i = 1; i <= 5; i++) {
      a = forecastData.list[b].dt;
      let startingDate = new Date(a * 1000);
      let forecastDate = startingDate.toLocaleDateString(undefined, options);

      let forecastTemp = forecastData.list[b].main.temp;

      forecast.innerHTML += `
            <section class="${forecastDate}-temperature">
            <div>${forecastDate}</div>
            <div>${forecastTemp}°</div>
            </section>`;

      b += 8;
    }
  });
