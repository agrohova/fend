const fetch = require('node-fetch');
const { userName1, baseURL1 } = require('./apiConfig');

async function handleGeonamesRequest(req, res) {
  const cityName = req.body.city;
  try {
    const geoResult = await getLatLon(cityName);
    res.status(200).send({ success: true, data: geoResult });
    console.log('Geonames result:', geoResult);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ error: 'Error processing the request.' });
  }
}

async function getLatLon(cityName) {
  const geonamesUrl = `${baseURL1}q=${cityName}&username=${userName1}`;
  try {
    const response = await fetch(geonamesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log('Geonames API Response:', data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

//Exports
module.exports = { handleGeonamesRequest }