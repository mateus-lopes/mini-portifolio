function getLocation() {
  const latitude = document.getElementById("latitude-input");
  const longitude = document.getElementById("longitude-input");

  if (latitude && longitude) {
    fetchData(latitude, longitude);
  } else {
    show("Erro");
  }
}

function fetchData(lat, long) {
  fetch(
    `https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=KuIW9skcDHPpQ7nv&lat=${lat}&lon=${long}&asl=275&format=json&forecast_days=1&history_days=1`
  )
    .then((response) => response.json())
    .then((data) => displayData(data))
    .catch((error) => console.error("Error fetching data:", error));
}

function displayData(data) {
  const dataContainer = document.getElementById("dataContainer");
  console.log(data["metadata"].latitude);
  console.log(data["metadata"].longitude);
  const dataClimate = data["data_day"];
  console.log(dataClimate);
  const elementTime = document.createElement("div");
  const elementWeather = document.createElement("div");
  elementTime.innerHTML = `<h2>${dataClimate.time[1]}</h2>`;
  elementWeather.innerHTML = `<h2>${dataClimate.temperature_instant[1]}</h2>`;

  const elementLocation = document.createElement("div");
  elementLocation.innerHTML = `<p>Lat: ${data["metadata"].latitude} Long:${data["metadata"].longitude}</p>`;

  dataContainer.appendChild(elementLocation);
  dataContainer.appendChild(elementTime);
  dataContainer.appendChild(elementWeather);
}
