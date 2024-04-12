function toggleDay(option) {
    var sky = document.getElementById('sky');
    var sun = document.getElementById('sun');
    var moon = document.getElementById('moon');
    const coulds = document.getElementsByClassName('coulds');
    
    const weather = document.getElementById('data-container');
    const button = document.querySelector('#button');

    if (option != "day") { // Daytime
        moon.style.opacity = '1';
        sky.style.backgroundColor = '#000033'; // Nighttime sky color
        sun.style.transform = 'translate(-80%, -160%)'; // Move sun out of view
        moon.style.transform = 'translate(-50%, -100%)'; // Move moon to center
        for(let i; i < coulds.length; i++) {
            coulds[i].style.backgroundColor = '#777'
        }
        weather.style.color = '#fff';
        button.style.backgroundColor = '#333';
    } else { // Nighttime
        moon.style.opacity = '0';
        sky.style.backgroundColor = '#87CEEB'; // Daytime sky color
        sun.style.transform = 'translate(-50%, -160%)'; // Move moon to center
        button.style.backgroundColor = '#FFD700';
        weather.style.color = '#000';
    }
}

function started(){
    toggleDay("day")
    var sun = document.getElementById('sun');
    sun.style.transform = 'translate(-50%, -90%)'; // Move sun to center
    const container = document.getElementById('container');
    const toggleBtn = document.getElementById('toggleBtn');
    container.style.width = 'auto';
    container.style.height = 'auto';
    container.style.overflow = 'visible';
    container.classList.add('fadeIn');
    toggleBtn.style.display = 'none'; 
}

document.getElementById('toggleBtn').addEventListener('click', started);

document.getElementById('dayBtn').addEventListener('click', () => {
    if (document.getElementById('moon').style.opacity == '0') {
        toggleDay('night');
    } else {
        toggleDay('day');
    }
});
  
//   lucas
const active = document.getElementById('active');
const coulds = document.getElementsByClassName('coulds');

async function fetchWeatherApi(lat, long, location) {
    let weatherApiKey = "KuIW9skcDHPpQ7nv";
    await fetch(
      `https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=${weatherApiKey}&lat=${lat}&lon=${long}&asl=275&format=json&forecast_days=1&history_days=1`
    )
      .then((response) => response.json())
      .then((data) => displayData(data, location))
      .catch((error) => console.error("Erro ao carregar dados:", error));
  }
  async function fetchGeoPositionApi(city) {
    await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        const location = `${data.results[0].name} - ${data.results[0].country}`;
        console.log(data.results[0]);
        fetchWeatherApi(latitude, longitude, location);
      })
      .catch((error) => console.error("Erro ao carregar dados:", error));
  }
  
  function displayData(data, location) {
    const elementLocation = document.getElementById("location");
    const elementPrecipitation = document.getElementById("precipitation_probability");
    const elementWeather = document.getElementById("weather");
  
    const dataClimate = data["data_day"];
    const minClimate = `<h2>Temperatura Min. <span class="response">${dataClimate.temperature_min[1]}</span></h2>`;
    const currentClimate = `<h2>Temperatura Atual <span class="response">${dataClimate.temperature_instant[1]}</span></h2>`;
    const maxClimate = `<h2>Temperatura Max. <span class="response">${dataClimate.temperature_max[1]}</span></h2>`;
  
    const data_compiled = dataClimate.time[1].split("-");
    const get_data = data_compiled.join(" / ");
    
    // mostarar somente o horario
    console.info(data["metadata"]);

    function calcularHoraLocal(horaUtc, fusoHorario) {
        const hora = parseInt(horaUtc.split(" ")[1].split(":")[0]);
        const horaLocal = hora + fusoHorario;
        return horaLocal;
      }
    
      console.log(data["metadata"]); // Saída: 2024-04-12 03:30:00
      
        let data1 = data["metadata"].modelrun_utc;
        let data2 = data["metadata"].utc_timeoffset;

        console.log(data1, data2);
        console.log(calcularHoraLocal(data1, data2));
    
    if ((calcularHoraLocal(data1, data2) >= 6 && calcularHoraLocal(data1, data2) <= 18)){
        toggleDay('day');
    } else {
        toggleDay('night');
    }
    
    // ativa chuva
    if(dataClimate.precipitation_probability[1] > 70) {
        elementPrecipitation.innerHTML = `<p class="rain-legend">Chance Alta de chuva</p>`;
        active.style.opacity = '1';
    } else if (dataClimate.precipitation_probability[1] >= 50) {
        active.style.opacity = '0';
        elementPrecipitation.innerHTML = `<p class="rain-legend">Chance Média de chuva</p>`;
    } else if (dataClimate.precipitation_probability[1] >= 40) {
        active.style.opacity = '0';
        elementPrecipitation.innerHTML = `<p class="rain-legend">Chance Baixa de chuva</p>`;
    } else {
        active.style.opacity = '0';
        elementPrecipitation.innerHTML = `<p class="rain-legend">Dia Ensolarado</p>`;
    }

    elementLocation.innerHTML = `<div class="location-content"><p>${location}</p><p>${get_data}</p></div>`;
    elementWeather.innerHTML =  minClimate + currentClimate + maxClimate;
  }
  
  function getLocation() {
    const city = document.getElementById("city").value;
    if (city) {
      fetchGeoPositionApi(city);
    } else {
      console.log("erro: insira o q voce quiser aqui pita");
    }
  }


// chuva

const rainContainer = document.querySelector('.rain');
const stopButton = document.getElementById('rainBtn');
let rainingInterval;

function createRaindrop() {
  const raindrop = document.createElement('div');
  raindrop.classList.add('raindrop');
  raindrop.style.left = `${Math.random() * window.innerWidth}px`;
  rainContainer.appendChild(raindrop);
}

function startRain() {
    if (active.style.opacity == '0') {
        active.style.opacity = '1';
    } else {
        active.style.opacity = '0';
    }
    rainingInterval = setInterval(createRaindrop, 300);
}

stopButton.addEventListener('click', () => {
    const active = document.getElementById('active');
    if (active.style.opacity == '0') {
        active.style.opacity = '1';
    } else {
        active.style.opacity = '0';
    }
});

startRain();