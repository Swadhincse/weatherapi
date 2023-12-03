function fetchWeatherData() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          navigateToWelcomePage(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }
  function navigateToWelcomePage(latitude, longitude) {
    const latitude = 23.1899136; 
    const longitude = 88.113152; 
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
    window.location.href = "welcome.html";
  }
  
 document.getElementById("fetchDataBtn").addEventListener("click", fetchWeatherData); 

  document.getElementById("latitude").textContent = latitude.toFixed(6);
  document.getElementById("longitude").textContent = longitude.toFixed(6);

const latitude = parseFloat(localStorage.getItem("latitude"));
const longitude = parseFloat(localStorage.getItem("longitude"));

function initMap(latitude, longitude) {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 12,
  });

  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: "Your Location",
  });
}

initMap(latitude, longitude);
  const apiKey = '433339b77f6b045bd16dd1ffe9237f54';
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Weather Data:', data);
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error.message);
    });

  function displayWeatherData(weatherData) {
    const weatherDataContainer = document.getElementById('weatherData');
    weatherDataContainer.innerHTML = `
      <p>Temperature: ${weatherData.current.temp}°C</p>
      <p>Humidity: ${weatherData.current.humidity}%</p>
      <p>Wind Speed: ${weatherData.current.wind_speed} m/s</p>
      <p>Pressure: ${weatherData.current.pressure} hPa</p>
      <p>Wind Direction: ${weatherData.current.wind_deg}°</p>
      <p>UV Index: ${weatherData.current.uvi}</p>
      <p>Time Zone: ${weatherData.timezone}</p>
    `;
  }

  fetchWeatherData(latitude, longitude);
  