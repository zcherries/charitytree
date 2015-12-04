var express = require('express');
var mongoose_models = require('./db/schemas');
var db = require('./db/connection.js');

var IP = '127.0.0.1', PORT = 8000;

var app = express();

app.use(express.static(__dirname + '/../' + 'client'));

app.get('/', function(req, res, next) {
  mongoose_models.donor.find({}, function(err, donors) {
    if (err) { throw err; }
    console.log("Donors: ", donors);
    res.send('index.html');
  });
});


app.listen(PORT, IP);

