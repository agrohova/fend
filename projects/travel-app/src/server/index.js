const dotenv = require('dotenv');
dotenv.config({ path: "./.env" });

//API 1: Geonames
//Geonames API doesn't require an API key, but a user name
const userName1 = process.env.USER_NAME1
const baseURL1 = "https://api.geonames.org/citiesJSON?";

//API 2 Weatherbit

//Weatherbit API documentation: https://www.weatherbit.io/api/weather-forecast-16-day
//Weatherbit only allows 7 days weather forecast as seen here: https://www.weatherbit.io/pricing

const apiKey2 = process.env.API_KEY2;
const baseURL2 = "https://api.weatherbit.io/v2.0/forecast/daily?";

//API 3 Pixabay

const apiKey3 = process.env.API_KEY3;
const baseURL3 = "https://pixabay.com/api/?";

//modules
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

//app
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../../dist")));

// designates what port the app will listen to for incoming requests
app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})

//define HTTP GET route
app.get('/allData', (req, res) => {
  try{
    res.status(200).send()
  } catch(err) {
    res.status(500).send()
  }
});

//define HTTP POST route

//Geonames API
app.post("/geo", (req, res) => {
  const cityName = req.body.city;

  getLatLon(cityName)
    .then((geoResult) => {
      res.status(200).send({ success: true, data: geoResult});
      console.log('Geonames result:', geoResult);
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).send({ error: 'Error processing the request.' });
  });
})

//make POST request to get lat & lon

const getLatLon = async (cityName) => { 
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
};

//Weatherbit API

app.post("/weather", (req, res) => {
  const cityName = req.body.city;

  getLatLon(cityName)
    .then((geoResult) => {
      const lat = geoResult[0].lat; // Get latitude from the geonames response
      const lon = geoResult[0].lon; // Get longitude from the geonames response

      getWeather(lat, lon)
        .then((weatherResult) => {
          res.status(200).send({ success: true, data: weatherResult });
          console.log('Weatherbit result:', weatherResult);
        })
        .catch((error) => {
          console.log('error', error);
          res.status(500).send({ error: 'Error processing the request.' });
        });
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).send({ error: 'Error processing the request.' });
    });
});

//Pixabay API
app.post("/pixabay", (req, res) => {
  const cityNamePix = req.body.city;

  getPics(cityNamePix)
    .then((picResult) => {
      res.status(200).send({ success: true, data: picResult});
      console.log('Pixabay result:', picResult);
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).send({ error: 'Error processing the request.' });
  });
})

const getPics = async (cityNamePix) => {
  const pixabayUrl = `${baseURL3}key=${apiKey3}&q=${cityNamePix}&image_type=photo`;
  
  try {
    const response = await fetch(pixabayUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    console.log('Pixabay API Response:', data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

module.exports = app;