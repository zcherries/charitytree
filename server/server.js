var express = require('express');
var path = require('path');
var Controller = require('./db/controllers');
var Model = require('./db/models');
var connection = require('./db/connection.js');
// var xray = require('x-ray');
// var x = new xray();
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


var app = express();
app.use(express.static(__dirname + '/../client'));

// var arrLinks = [];
// app.get('/organizations', function(req, res, next) {
//   x('http://www.unodc.org/ngo/list.jsp', 'tr td p', ['a@href'], [{
//     href: '@href'
//   }])(function(err, links) {
//     arrLinks = links.map(function(link) {
//       if (link != null)
//         return link;
//     });
//     res.send(arrLinks);
//   })
//   // res.send('index.html')
// });
app.get('/aofs', function(req, res, next) {
  Controller.AoF.retrieve(req, res, next);
  // Controller.AoF.delete(req, res, next, {}, {}, 'find');
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
