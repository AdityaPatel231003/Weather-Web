// Function to fetch weather data for a given location and update the page
async function getWeatherData(location) {
    const apiKey = 'cc018f6b97144592b0b121155253001'; // API key
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Check if the response contains an error (e.g., invalid city)
      if (data.error) {
        document.getElementById('temperature').textContent = 'City not found. Please try again.';
        document.getElementById('condition').textContent = '';
        document.getElementById('air-quality').textContent = '';
        return;
      }
  
      // Extract weather data
      const temperature = data.current.temp_c; // Current temperature in Celsius
      const condition = data.current.condition.text; // Weather condition (e.g., Clear, Cloudy)
      const airQuality = data.current.air_quality.pm10; // PM10 air quality (example, can be adjusted to other parameters)
  
      // Update the page with the weather info
      document.getElementById('temperature').textContent = `${temperature}°C`;
      document.getElementById('condition').textContent = `Condition: ${condition}`;
      document.getElementById('air-quality').textContent = `PM10 Air Quality: ${airQuality}`;
  
    } catch (error) {
      console.error('Error fetching weather data:', error);
      document.getElementById('weather-info').textContent = 'Failed to fetch weather data. Please try again later.';
    }
  }
  
  // Event listener for the button
  document.getElementById('get-weather-btn').addEventListener('click', () => {
    const location = document.getElementById('location').value.trim();
    if (location) {
      getWeatherData(location);
    } else {
      alert('Please enter a city name.');
    }
  });
  