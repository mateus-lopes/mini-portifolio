var weatherApiKey = "";
var geoPositionApiKey = "";

async function fetchApiKeys() {
  await fetch("apiKeys.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      weatherApiKey = data.climateApiKey;
      geoPositionApiKey = data.geoPositionApiKey;
      getLocation();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function fetchWeatherApi(lat, long, location) {
  await fetch(
    `https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=${weatherApiKey}&lat=${lat}&lon=${long}&asl=275&format=json&forecast_days=1&history_days=1`
  )
    .then((response) => response.json())
    .then((data) => displayData(data, location))
    .catch((error) => console.error("Erro ao carregar dados:", error));
}
async function fetchGeoPositionApi(city) {
  await fetch(
    `http://api.positionstack.com/v1/forward?access_key=${geoPositionApiKey}&query=${city}`
  )
    .then((response) => response.json())
    .then((data) => {
      const latitude = data.data[0].latitude;
      const longitude = data.data[0].longitude;
      const location = data.data[0];
      fetchWeatherApi(latitude, longitude, location);
    })
    .catch((error) => console.error("Erro ao carregar dados:", error));
}

function displayData(data, location) {
  console.log(data.data_day);
  const dataContainer = document.getElementById("dataContainer");
  const dataClimate = data["data_day"];
  console.log(dataClimate);

  const elementLocation = document.createElement("div");

  elementLocation.innerHTML = `<p>Location: ${location.label}</p>`;

  const elementTime = document.createElement("div");
  const elementWeather = document.createElement("div");
  elementTime.innerHTML = `<h2>Date: ${dataClimate.time[1]}</h2>`;
  const currentClimate = `<h2>Current Climate: ${dataClimate.temperature_instant[1]}</h2>`;
  const maxClimate = `<h2>Max. Climate today: ${dataClimate.temperature_max[1]}</h2>`;
  const minClimate = `<h2>Min. Climate today: ${dataClimate.temperature_min[1]}</h2>`;
  elementWeather.innerHTML = currentClimate + maxClimate + minClimate;

  dataContainer.appendChild(elementLocation);
  dataContainer.appendChild(elementTime);
  dataContainer.appendChild(elementWeather);
}

function getLocation() {
  const city = document.getElementById("city").value;
  if (city) {
    fetchGeoPositionApi(city);
  } else {
    console.log("erro: insira o q voce quiser aqui pita");
  }
}

function doTheThing() {
  fetchApiKeys();
}
