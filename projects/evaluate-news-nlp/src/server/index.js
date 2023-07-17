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
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

//define HTTP GET route
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

//API POST request to MeaningCloud
const apiKey = process.env.API_KEY;
const baseURL = "https://api.meaningcloud.com/sentiment-2.1?";

//define HTTP POST route to receive article to analyze

app.post("/submitData", (req, res) => {

  let urlData = req.body.url;
  meaningCloud(urlData)
    .then((analysisResult) => {
      res.status(200).send(analysisResult);
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).send({ error: 'Error processing the request.' });
  });
});

//make POST request to analyze sentiment

const meaningCloud = async (urlData) => {
    const meaningCloudUrl = `${baseURL}key=${apiKey}&lang=en&txt=HTML&url=${urlData}&model=general`;
    const response = await fetch(meaningCloudUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(urlData),
    });
  
    try {
      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };