const rainContainer = document.querySelector('.rain');
const stopButton = document.getElementById('stopButton');
let rainingInterval;

function createRaindrop() {
  const raindrop = document.createElement('div');
  raindrop.classList.add('raindrop');
  raindrop.style.left = `${Math.random() * window.innerWidth}px`;
  rainContainer.appendChild(raindrop);
}

function startRain() {
  rainingInterval = setInterval(createRaindrop, 100);
}

function stopRain() {
  clearInterval(rainingInterval);
}

stopButton.addEventListener('click', stopRain);

startRain();
