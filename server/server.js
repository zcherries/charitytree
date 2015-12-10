var express = require('express');
var path = require('path');
var Controller = require('./db/controllers');
var Model = require('./db/models');
var connection = require('./db/connection.js');
var organizations = require('./resources/organizations.js');
var bodyParser = require('body-parser')
var fs = require('fs');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

var IP = '127.0.0.1', PORT = 4000;

app.use(express.static(__dirname + '/../client'));

var imgPath = 'C:/Users/T410/Documents/GitHub/charitytree/server/resources/Hydrangeas.jpg';

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
app.get('/image', function(req, res) {
  console.log('Inside GET Image')
  Model.Organization.findById({_id:"56663575f7ec540c2d4698fb"}, function(err, org) {
    if (err) {console.error(err); res.status(400).send('Could not retrieve data'); }
    else {
      console.log('Org Name: ', org.name);
      // org.profile_img.data = fs.readFileSync(imgPath);
      // org.profile_img.contentType = 'image/jpeg';
      // org.save(function(err, currOrg) {
      //   console.log("Save org, about to send")
      //   console.log(org.profile_img.contentType);
      var img = new Buffer(org.profile_img.data).toString('base64');
        res.contentType(org.profile_img.contentType);
        // console.log(org.profile_img.data);
        res.send(img);
      // });
    }
  });
});


app.get('/organizations', function(req, res, next) {
  Controller.Organization.retrieve(req, res, next);
});

app.get('/get_browse', function(req, res, next) {
  Controller.AoF.retrieve(req, res, next);
});

app.post('/post_search', function(req, res, next) {
  Model.Organization.find({ areas_of_focus: { $in: req.body.aofs } }, function(err, orgs) {
    if (err) { console.log(err); res.status(400).send('Could not retrieve data'); }
    else {
      orgs.forEach(function(org, idx) {
        if (org.profile_img.contentType) {
          console.log("Org: ", org.profile_img.contentType)
          var img = new Buffer(org.profile_img.data).toString('base64');
          org.img = img;
        }
      });
      Model.Project.find({ areas_of_focus: { $all: req.body.aofs } }, function(err, projects) {
        if (err) throw err;
        else {
          // res.contentType(org.contentType);
          // res.contentType('multipart/mixed');
          res.send({status: 201, results: { orgs: orgs, projects: projects }});
          // res.send()
        }
      });
    }
  });
});

app.get('/', function(req, res) {
  console.log("Get Index Page")
  res.send('index.html');
});

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
 app.get('*', function (req, res){
   res.sendFile(path.resolve(__dirname, './../client', 'index.html'))
 });

app.listen(PORT, IP);
