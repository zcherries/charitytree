var express = require('express');
var path = require('path');
//var Model = require('./db/controllers');
//var connection = require('./db/connection.js');

var IP = '127.0.0.1', PORT = 8000;

var app = express();

app.use(express.static(__dirname + '/../client'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, './../client', 'index.html'))
});

app.get('/organizations', function(req, res, next) {
  // var orgData = { name: 'Red Cross', about: 'We are Red Cross', signup_date: '12/4/2015' }
  // org.create(req, res, next, orgData);
  // org.update(req, res, next, {name: 'Red Cross'}, {name: 'The Red Cross'});
  // org.retrieve(req, res, next, {}, { select: 'about name', sort: {signup_date: -1}});
  // org.delete(req, res, next, {name: "The Red Cross"}, {}, 'find');
});

app.listen(PORT, IP);
