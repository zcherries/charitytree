var express = require('express');
var path = require('path');
var Controller = require('./db/controllers');
var Model = require('./db/models');
var connection = require('./db/connection.js');
//var xray = require('x-ray');
//var x = new xray();
// var promisify = require("promisify-node");
var fs = require('fs');
var IP = '127.0.0.1', PORT = 4000;

// var rl = require('readline').createInterface({
//  input: require('fs').createReadStream('../areas_of_focus.txt')
// });

// rl.on('line', function(aof) {
//   Model.AoF.findOne({name: aof}, function(err, match) {
//     if (!match) {
//       console.log(aof)
//       Model.AoF.create({name: aof}, function(err, line) {
//         console.log('Line from file:', line);
//       });
//     }
//   });
// });

var organizations = require('./resources/organizations.js')

var app = express();
app.use(express.static(__dirname + '/../client'));

app.get('/organizations', function(req, res, next) {
  // Controller.Organization.retrieve(req, res, next);
  organizations.forEach(function(org) {
    Controller.Organization.create(req, res, next, org);
  });
});

app.get('/browse', function(req, res, next) {
  Controller.AoF.retrieve(req, res, next);
  //This line deletes the database
  // Controller.AoF.delete(req, res, next, {}, {}, 'find');
});

app.get('/search', function(req, res, next) {
  Model.Organization.find({ areas_of_focus: { $in: req.body.aofs } }, { sort: 'signup_date' }).then(function(orgs) {
    Model.Project.find({ areas_of_focus: { $in: req.body.aofs } }, { sort: 'start_date' }).then(function(projects) {
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
