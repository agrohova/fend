const fetch = require('node-fetch');
const { apiKey2, baseURL2 } = require('./apiConfig');

async function handleWeatherbitRequest(req, res) {
  const cityName = req.body.city;
  try {
    const geoResult = await getLatLon(cityName);
    const lat = geoResult[0].lat;
    const lon = geoResult[0].lon;
    const weatherResult = await getWeather(lat, lon);
    res.status(200).send({ success: true, data: weatherResult });
    console.log('Weatherbit result:', weatherResult);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ error: 'Error processing the request.' });
  }
}
  
async function getWeather(lat, lon) {
  const weatherUrl = `${baseURL2}lat=${lat}&lon=${lon}&key=${apiKey2}`;
  try {
    const response = await fetch(weatherUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log('Weatherbit API Response:', data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

//Exports
module.exports = { handleWeatherbitRequest }