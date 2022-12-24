const InfoSection = document.getElementById("Data-from-app");
const weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ba39a634841efd509a1c7b07a0c59e68";

fetch(weatherApi)
    .then((response) => {
        console.log(`Response: ${response}`);
        return response.json();
    
    })
    .then((data) => {
        InfoSection.innerHTML += `<div>${data.name}</div>`
        InfoSection.innerHTML += `<div>${data.main.temp}</div>`
        InfoSection.innerHTML += `<div>${data.weather.map((info) => info.description)}</div>`
        console.log(data.weather)
        let date = new Date();
        console.log(date)
        
    });
