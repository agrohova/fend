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

//define HTTP GET route
app.get('/allData', (req, res) => {
  try{
    res.status(200).send()
  } catch(err) {
    res.status(500).send()
  }
});

//define HTTP POST route
app.post("/tripData", (req, res) => {
  const cityName = req.body.city;
  const tripDate = req.body.date;
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})