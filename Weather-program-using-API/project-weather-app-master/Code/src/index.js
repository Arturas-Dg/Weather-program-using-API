const weatherApi =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=ba39a634841efd509a1c7b07a0c59e68";
const weatherForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ba39a634841efd509a1c7b07a0c59e68";
const temperatureDescription = document.getElementById("temp-description");

const country = document.getElementById("country-name");
const sunsetSunrise = document.getElementById("sunset-sunrise");
const cloud = document.getElementById("cloud-svg");
const sunglasses = document.getElementById("sunglasses-svg");
const umbrella = document.getElementById("umbrella-svg");
const snow = document.getElementById("snow-svg");
const forecast = document.getElementById("forecast");
const body = document.body;

body.style.backgroundColor = "black";
fetch(weatherApi)
  .then((weatherResponse) => {
    return weatherResponse.json();
  })
  .then((weatherData) => {
    console.log(`Response: ${weatherData.weather[0].description}`);
    country.innerHTML += `<div>${weatherData.name}</div>`;
    country.style.color = "black";
    let temperature = weatherData.main.temp;

    temperatureDescription.innerHTML += `<div>${weatherData.weather[0].description} | </div>`;
    temperatureDescription.innerHTML += `<div class="temp">${temperature}°</div>`;

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
      document.body.style.color = "red";
      document.body.style.backgroundColor = "#F5EEE6";
    } else if (weatherData.weather[0].description.includes("snow")) {
      snow.style.display = "block";
      document.body.style.color = "#F05454";
      body.style.backgroundColor = "#F5F5F5";
    } else if (weatherData.weather[0].description.includes("clear")) {
      sunglasses.style.display = "block";
      document.body.style.color = "#557C55";
      document.body.style.backgroundColor = "AntiqueWhite";
    } else if (weatherData.weather[0].description.includes("rain")) {
      umbrella.style.display = "block";
      document.body.style.color = "#280274";
      document.body.style.backgroundColor = "#DCF2F1";
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
