var express = require('express');
var path = require('path');
var Controller = require('./db/controllers');
var Model = require('./db/models');
var connection = require('./db/connection.js');

// var fs = require('fs');
// var rl = require('readline').createInterface({
//   input: require('fs').createReadStream('../countriesoftheworld.txt')
// });

// rl.on('line', function(line) {
//   Model.AoF.create({name: line}, function(err, country) {
//     // console.log('Line from file:', line)
//   });
// });

var IP = '127.0.0.1', PORT = 4000;

var app = express();

app.use(express.static(__dirname + '/../client'));

app.get('/organizations', function(req, res, next) {

});

app.get('/aofs', function(req, res, next) {
  Controller.AoF.retrieve(req, res, next);
});

app.get('/browse', function(req, res, next) {
  Model.Organization.find({}).then(function(orgs) {
    Model.Project.find({}).then(function(projects) {
      res.send({ status: 200, results: { orgs: orgs, projects: projects } });
    });
  });
});

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, './../client', 'index.html'))
});

app.listen(PORT, IP);
