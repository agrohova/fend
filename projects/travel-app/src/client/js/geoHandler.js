const dotenv = require('dotenv');
dotenv.config({ path: "./.env" });
const fetch = require('node-fetch');

// Geonames API
const userName1 = process.env.USER_NAME1;
const baseURL1 = "https://api.geonames.org/citiesJSON?";

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
      credentials: "include",
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
export { getLatLon, handleGeonamesRequest}