const dotenv = require('dotenv');
dotenv.config = require("../../.env")

const geoHandler = require('../client/js/geoHandler');
const picHandler = require('../client/js/picHandler');
const weatherHandler = require('../client/js/weatherHandler');

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

// HTTP GET route
app.get('/allData', (req, res) => {
  try {
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
});

// Geonames API
app.post("/geo", geoHandler.handleGeonamesRequest);

// Weatherbit API
app.post("/weather", weatherHandler.handleWeatherbitRequest);

// Pixabay API
app.post("/pixabay", picHandler.handlePixabayRequest);

module.exports = app;