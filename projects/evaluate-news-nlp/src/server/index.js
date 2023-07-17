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
//this part of the code was copied from the API documentation here: https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/dev-tools
const formdata = new FormData();
formdata.append("key", apiKey);
formdata.append("txt", urlData);
formdata.append("lang", "en");  

const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
}
  
const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
  .then(response => ({
    status: response.status, 
    body: response.json()
  }))
  .then(({ status, body }) => console.log(status, body))
  .catch(error => console.log('error', error));

  