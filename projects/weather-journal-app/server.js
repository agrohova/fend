// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware. *as body parser has been deprecated, using
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
// Spin up the server
const server = app.listen(port, listening);

function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

// Establish GET route
app.get('/allData', getData);

function getData (req, res) {
  console.log(req)
  res.send(projectData);
};

// Establish POST route
const data = []

app.post('/addData', addData);

function addData (req, res){
    const { temperature, date, response } = req.body;
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = response;

    console.log(projectData);
    data.push(projectData);
// help code - info message
res.status(200).json({ message: 'Data were added!' });
}