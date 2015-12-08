var express = require('express');
var path = require('path');
var Controller = require('./db/controllers');
var Model = require('./db/models');
var connection = require('./db/connection.js');
var organizations = require('./resources/organizations.js')

var app = express();

var IP = '127.0.0.1', PORT = 4000;

app.use(express.static(__dirname + '/../client'));

// organizations.forEach(function(org) {
//   var newOrg = new Model.Organization(org);
//   newOrg.save(function(err, obj) {
//     if (err) {
//       console.error("Error: ", err)
//     } else {
//       console.log("New organization has been added")
//     }
//   });
// });

app.get('/organizations', function(req, res, next) {
  Controller.Organization.retrieve(req, res, next);
});

app.get('/browse', function(req, res, next) {
  Controller.AoF.retrieve(req, res, next);
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
