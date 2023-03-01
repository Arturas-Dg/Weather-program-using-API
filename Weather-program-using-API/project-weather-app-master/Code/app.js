const weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ba39a634841efd509a1c7b07a0c59e68";  
const weatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ba39a634841efd509a1c7b07a0c59e68";
const temperatureDescription = document.getElementById("temp-description");
const sunsetSunrise = document.getElementById("sunset-sunrise");
const cloud = document.getElementById("cloud-svg");
const sunglasses = document.getElementById("sunglasses-svg");
const umbrella = document.getElementById("umbrella-svg");



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
        let roundedTemp = temperature.toPrecision(1);


        temperatureDescription.innerHTML += `<div class="temp">${roundedTemp}° |</div>`
        temperatureDescription.innerHTML += `<div>${weatherData.weather[0].description}</div>`
        
        const sunrise = weatherData.sys.sunrise;
        const sunset = weatherData.sys.sunset;

        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});

        sunsetSunrise.innerHTML += `<div>Sunrise: ${sunriseTime}</div>`;
        sunsetSunrise.innerHTML += `<div>Sunset: ${sunsetTime}</div>`;    
        if (weatherData.weather[0].description.includes("cloud")) {
            cloud.style.display = "block";
            body.style.color = "white";

        } else if(weatherData.weather[0].description.includes("snow")) {
            cloud.style.display = "block";
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
        console.log(`Forecast response: ${forecastResponse}`)
        return forecastResponse.json()
    })
    .then((forecastData) => {
        let b = 7;
        const options = { weekday: "long" };
        for(let i= 1; i <=5 ;i++) {


            a = forecastData.list[b].dt;
            let startingDate = new Date(a * 1000)
            let forecastDate = startingDate.toLocaleDateString(undefined, options)
            
            let forecastTemp = forecastData.list[b].main.temp;
            
            
            forecast.innerHTML += `
            <section class="${forecastDate}-temperature">
            <div>${forecastDate}</div>
            <div>${forecastTemp}°</div>
            </section>`

            
            b += 8;
        }

    })


//     Umbrella <svg xmlns="http://www.w3.org/2000/svg" width="73.451" height="73" viewBox="0 0 73.451 73">
//   <g id="noun_Umbrella_2030530" transform="translate(0 -0.435)">
//     <g id="Layer_2" data-name="Layer 2" transform="translate(0 0.435)">
//       <g id="Layer_1" data-name="Layer 1">
//         <path id="Path_6" data-name="Path 6" d="M54.553,83.166a6.28,6.28,0,0,1-6.273-6.273V48.549a1.249,1.249,0,1,1,2.5,0V76.893a3.775,3.775,0,1,0,7.543,0,1.249,1.249,0,0,1,2.5,0,6.28,6.28,0,0,1-6.265,6.273Z" transform="translate(-12.818 -12.955)" fill="#164a68"/>
//         <path id="Path_7" data-name="Path 7" d="M73.451,43.087h-2.2l-.331-.735a6.3,6.3,0,0,0-11.524,0l-.331.735H57.093l-.331-.735a6.3,6.3,0,0,0-11.524,0l-.331.735H42.939l-.323-.735a6.3,6.3,0,0,0-11.532,0l-.323.735H28.793l-.331-.735a6.3,6.3,0,0,0-11.524,0l-.331.735H14.646l-.331-.735a6.3,6.3,0,0,0-11.524,0l-.331.735H0V41.838A34.265,34.265,0,0,1,34.228,7.61h4.995A34.265,34.265,0,0,1,73.451,41.838ZM22.7,36.094a8.814,8.814,0,0,1,7.073,3.57,8.814,8.814,0,0,1,14.147,0,8.814,8.814,0,0,1,14.147,0A8.814,8.814,0,0,1,70.733,38.1a31.775,31.775,0,0,0-31.51-28H34.228A31.782,31.782,0,0,0,2.688,38.335,8.814,8.814,0,0,1,15.63,39.664a8.814,8.814,0,0,1,7.073-3.57Z" transform="translate(0 -2.418)" fill="#164a68"/>
//         <path id="Path_8" data-name="Path 8" d="M49.578,3.87h0a2.248,2.248,0,0,1,2.248,2.248V7.241h-4.5V6.118A2.248,2.248,0,0,1,49.578,3.87Z" transform="translate(-12.566 -1.425)" fill="#164a68"/>
//         <path id="Path_9" data-name="Path 9" d="M20.8,42.047A1.249,1.249,0,0,1,19.549,40.8,36.351,36.351,0,0,1,30.838,13.923,38.283,38.283,0,0,1,42.157,6.3a1.25,1.25,0,0,1,.911,2.328h0A36.373,36.373,0,0,0,32.5,15.8a33.458,33.458,0,0,0-10.415,25A1.249,1.249,0,0,1,20.8,42.047Z" transform="translate(-5.189 -2.047)" fill="#164a68"/>
//         <path id="Path_10" data-name="Path 10" d="M70.476,42.037a1.249,1.249,0,0,1-1.249-1.249c0-23.13-20.838-32.1-21.051-32.186a1.249,1.249,0,1,1,.962-2.3,39.855,39.855,0,0,1,11.3,7.823A36.468,36.468,0,0,1,71.732,40.788,1.256,1.256,0,0,1,70.476,42.037Z" transform="translate(-12.567 -2.036)" fill="#164a68"/>
//         <path id="Path_11" data-name="Path 11" d="M39.875,42.008a1.249,1.249,0,0,1-1.249-1.183c-.044-.948-1.131-23.365,7.7-33.134a1.249,1.249,0,0,1,1.851,1.675c-8.138,9.005-7.088,31.106-7.051,31.327a1.249,1.249,0,0,1-1.183,1.315Z" transform="translate(-10.238 -2.338)" fill="#164a68"/>
//         <path id="Path_12" data-name="Path 12" d="M56.484,41.987H56.41a1.249,1.249,0,0,1-1.175-1.315c0-.22,1.072-22.329-7.051-31.327a1.249,1.249,0,1,1,1.851-1.675c8.814,9.769,7.742,32.186,7.69,33.134a1.249,1.249,0,0,1-1.241,1.183Z" transform="translate(-12.7 -2.317)" fill="#164a68"/>
//         <rect id="Rectangle_4" data-name="Rectangle 4" width="73" height="73" fill="none"/>
//       </g>
//     </g>
//   </g>
// </svg>
