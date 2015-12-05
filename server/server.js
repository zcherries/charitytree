var express = require('express');
var mongoose_models = require('./db/schemas');
var db = require('./db/connection.js');
const path = require('path');

var IP = '127.0.0.1', PORT = 8000;

var app = express();

app.use(express.static(__dirname + '/../client'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, './../client', 'index.html'))
});

app.get('/', function(req, res, next) {
  mongoose_models.donor.find({}, function(err, donors) {
    if (err) { throw err; }
    console.log("Donors: ", donors);
    res.send('index.html');
  });
});

app.listen(PORT, IP);

