var express = require('express');
var path = require('path');
var Controller = require('./db/controllers');
var Model = require('./db/models');
var connection = require('./db/connection.js');
var organizations = require('./resources/organizations.js');
var bodyParser = require('body-parser')


var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

var IP = '127.0.0.1', PORT = 4000;

app.use(express.static(__dirname + '/../client'));

 //organizations.forEach(function(org) {
 //  var newOrg = new Model.Organization(org);
 //  newOrg.save(function(err, obj) {
 //    if (err) {
 //      console.error("Error: ", err)
 //    } else {
 //      console.log("New organization has been added")
 //    }
 //  });
 //});

app.get('/get_organizations', function(req, res, next) {
  Controller.Organization.retrieve(req, res, next);
});

app.get('/get_browse', function(req, res, next) {
  Controller.AoF.retrieve(req, res, next);
});

app.post('/post_search', function(req, res, next) {
  Model.Organization.find({ areas_of_focus: { $in: req.body.aofs } }, function(err, orgs) {
    if (err) { console.log(err); res.status(400).send('Could not retrieve data'); }
    else {
      var foundOrgs = orgs;
      Model.Project.find({ areas_of_focus: { $in: req.body.aofs } }, function(err, projects) {
        if (err) throw err;
        else {
          res.send({status: 201, results: { orgs: foundOrgs, projects: projects }});
        }
      });
    }
  });
});

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, './../client', 'index.html'))
});

app.listen(PORT, IP);
