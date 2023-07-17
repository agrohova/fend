const dotenv = require('dotenv');
dotenv.config({ path: "./.env" });

//modules
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config({ path: "./.env" });

//app
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../../dist")));

//project data
let projectData = {};

const apiKey = process.env.API_KEY;
const baseURL = "https://api.meaningcloud.com/sentiment-2.1?";

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

//API POST request to MeaningCloud

//define HTTP POST route

app.post("/submitData", (req, res) => {
  console.log(req.body.url);
  const urlData = req.body.url;
  postMeaningCloud(urlData)
    .then((analysisResult) => {
      Object.assign(projectData, analysisResult);
      res.status(200).send({ success: true });
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).send({ error: 'Error processing the request.' });
  });
});

//make POST request to analyze sentiment

const postMeaningCloud = async (urlData) => {
    const meaningCloudUrl = `${baseURL}key=${apiKey}&lang=en&txt=HTML&url=${urlData}&model=general`;
    const response = await fetch(meaningCloudUrl, {
      method: "POST",
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
  
  //define HTTP GET route
  app.get("/analysis", (req, res) => {
    res.sendFile(path.resolve('src/client/views/index.html'));
  });
  