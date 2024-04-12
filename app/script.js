

document.getElementById('toggleBtn').addEventListener('click', function toggleDay() {
    var sky = document.getElementById('sky');
    var sun = document.getElementById('sun');
    var moon = document.getElementById('moon');
    var toggleBtn = document.getElementById('toggleBtn');
    const coulds = document.getElementsByClassName('coulds');
    
    if (sky.style.backgroundColor === 'rgb(135, 206, 235)') { // Daytime
        moon.style.opacity = '1';
        sky.style.backgroundColor = '#000033'; // Nighttime sky color
        sun.style.transform = 'translate(-80%, -50%)'; // Move sun out of view
        moon.style.transform = 'translate(-50%, -50%)'; // Move moon to center
        toggleBtn.innerText = 'Change to Day'; // Change button text
        for(let i; i < coulds.length; i++) {
            coulds[i].style.backgroundColor = '#777'
        }
    } else { // Nighttime
        moon.style.opacity = '0';
        sky.style.backgroundColor = '#87CEEB'; // Daytime sky color
        sun.style.transform = 'translate(-50%, -50%)'; // Move sun to center
        // moon.style.transform = 'translate(-150%, -50%)'; // Move moon out of view
        toggleBtn.innerText = 'Change to Night'; // Change button text
    }
  });
