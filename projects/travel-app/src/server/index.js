const dotenv = require('dotenv');
dotenv.config({ path: "./.env" });

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

  postGeonames(cityName)
    .then((geoResult) => {
      res.status(200).send({ success: true, data: geoResult});
      console.log('Geonames result:', geoResult);
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).send({ error: 'Error processing the request.' });
  });
})

//Weatherbit API

app.post("/weather", (req, res) => {
  const lat=geoResult[0].lat
  const lon=geoResult[0].lon

  postWeatherbit(lat, lon)
    .then((weatherResult) => {
      res.status(200).send({ success: true, data: weatherResult});
      console.log('Weatherbit result:', weatherResult);
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).send({ error: 'Error processing the request.' });
  });
})

//Pixabay API
app.post("/pixabay", (req, res) => {
  postPixabay(cityName)
    .then((picResult) => {
      res.status(200).send({ success: true, data: picResult});
      console.log('Pixabay result:', picResult);
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).send({ error: 'Error processing the request.' });
  });
})

module.exports = app;