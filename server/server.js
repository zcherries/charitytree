var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var Controller = require('./db/controllers');
var Model = require('./db/models');
var _db = require('./db/connection.js');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// var FileStore = require('session-file-store')(session);
// var session_helpers = require('./helpers/session-helpers.js');

var path = require('path');
var fs = require('fs');
var multer = require('multer');
var streamifier = require('streamifier');
var bcrypt = require('bcrypt-nodejs');

//var webpack = require('webpack');
//var WebpackDevServer = require('webpack-dev-server');
// var config = require('../webpack.config.js');



var IP = '127.0.0.1', PORT = 4000;

var app = express();
var server = require('http').Server(app);
// var io = require('socket.io')(server);

var feed = require('./socket.io.js')(server);

// import {Router, History} from 'react-router';
// var Router = require('react-router');
// var React = require('react');
// var routes = require('../client/config/routes.js');

server.listen(PORT, IP);

//================================= MIDDLEWARE ==================================/

//server static files
app.use(express.static(path.join(__dirname, '../client')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//parse cookies
app.use(cookieParser());

// session middleware
app.use(session({
  // name: 'server-session-cookie-id',
  secret: '@%20%23&amp;',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: _db.connection
  }),
  // store: new FileStore({ retries: 50 }),
  cookie: { maxAge: 3600000 }
}));



// var util = require('util');
// var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
// var log_stdout = process.stdout;
// console.log = function(d) { //
//   log_file.write(util.format(d) + '\n');
//   log_stdout.write(util.format(d) + '\n');
// };


// io.on('connection', function(client) {
//   console.log('Client is Connected');
//   client.on('test', function(data) {
//     console.log('Data: ', data);
//   })
//   client.emit('logged in', ["I just logged in"]);
// });

//app.use('/client/js', express.static(path.join(__dirname, '../client/js')));
// app.use(require('morgan')('dev'));



// app.use(function printSession(req, res, next) {
//   console.log('req.session', req.session);
//   return next();
// });

// function isObject(obj) {
// 	return obj != null && typeof obj === 'object';
// }
//
// function extend(destination /*, sources */) {
// 	if (!isObject(destination)) return {};
// 	var arrObj = [].slice.call(arguments, 1);
// 	arrObj.forEach(function(e, key, coll) {//e is an obj
// 		var objKeys = Object.keys(e);
// 		objKeys.forEach(function(elem, ind, list) {//elem is an object property
// 			destination[elem] = e[elem];
// 		});
// 	});
// 	return destination;
// }

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// app.use('/dashboard', session_helpers.validateSession);

//================================== GET ====================================//
// app.get('/', function(req, res, next) {
//   console.log("Get Index Page");
//   res.send('index.html');
// });

app.get('/dashboard_data', function(req, res) {
  console.log("App.get/dashboard_data");
  // console.log('body: ', req.headers)
  if (req.session && req.session.user) {
    console.log('In session')
    if (req.session.user.type === 'organization') {
      // console.log('Organization')
      // console.log('User ID: ', req.session.user.uid)
      Model.Organization.findOne({_id: req.session.user.uid}).select('-password -profile_img.data')
        .populate('projects endorsements').exec(function(err, org) {
          if (err) throw err;
          else {
            // console.log(org)
            // var images = [], count = 0;
            // org.images.forEach(function(fileId, idx) {
            //   console.log("Index: ", idx)
            //   var buffer = new Buffer(0);
            //   var readstream = connection.gridfs.createReadStream({ _id: fileId });
            //
            //   readstream.on('data', function(chunk) {
            //     buffer = Buffer.concat([buffer, chunk]);
            //   });
            //
            //   readstream.on('error', function (err) {
            //     console.log('An error occurred!', err);
            //     throw err;
            //   });
            //
            //   readstream.on('close', function() {
            //     images[idx] = buffer.toString('base64');
            //     if (org.images.length === ++count) {
            //       res.status(200).send({status: 200, results: org, imgs: images });
            //     }
            //   });
            // });
            res.status(200).send({status: 200, results: org, userType: req.session.user.type });
          } //end else
        });
    } else if (req.session.user.type === 'donor') {
      Model.Donor.findOne({ _id: req.session.user.uid }).select('-password').exec(function(err, donor) {
        if (err) { console.log(err); }
        else {
          res.send({ status: 200, results: donor, userType: req.session.user.type });
        }
      });
    }
  } else {
    res.status(401).send({ status: 401, message: "Unauthorized to access dashboard" });
  }
});

app.get('/dashboard_data/projects', function(req, res, next) {
  if (req.session && req.session.user) {
    if (req.session.user.type === 'organization') {
      Model.Organization.findOne({ _id: req.session.user.uid })
      .select('projects -_id').populate('projects').exec(function(err, projects) {
        if (err) throw err;
        else { res.status(200).send({ status: 200, results: projects }); }
      });
    }
  } else {
    res.status(401).send({ status: 401, message: "Unauthorized to access dashboard" });
  }
});

app.get('/dashboard_data/media/:id', function(req, res, next) {
  var readstream = _db.gridfs.createReadStream({ _id: req.params.id });
  readstream.pipe(res);
});

app.get('/image', function(req, res) {
  var file_exists = function (options) {
    _db.gridfs.exist(options, function (err, found) {
      if (err) {
        console.error(err);
        return false;
      }
      return found ? true : false;
    });
  }
});

// app.get('/remove_media', function(req, res) {
//   var options = { filename: 'Wildlife.wmv' }
//   // if (file_exists(options)) {
//   _db.gridfs.remove(options, function (err) {
//     if (err) console.log(err);
//     else {
//       console.log('success');
//       res.send('Successfully deleted ' + options.filename);
//     }
//   });
//   // }
// });

app.get('/get_orgs', function(req, res, next) {
  Controller.Organization.retrieve(req, res, next);
});

app.get('/organization_get/:id', function(req, res, next) {
 // console.log('Org ID: ', req.body.orgID);
 console.log("inside of server.js and req.params.id is ",req.params.id);

 var id = req.params.id;

 Model.Organization.findOne({ _id: id })
 .populate('projects').exec(function(err, org) {
   if (err) throw err;
   else {
     console.log('Retrieved Org', org)
     res.status(200).send({status: 200, results: org });
   }
 });
});

app.get('/dashboard_data/profile_img/:user/:filename', function(req, res, next) {
  console.log(req.params)
  Model.Organization.findOne({ username: req.params.user }, function(err, org) {
    if (err) { console.error(err); res.status(400).send('Could not retrieve data'); }
    else {
      streamifier.createReadStream(org.profile_img.data).pipe(res);
    }
  });
});
//================================== POST ===================================//
app.post('/signup_post', function(req, res, next) {
  console.log('Body: ', req.body);
  bcrypt.hash(req.body.pwd, null, null, function(err, hash) {
    if (err) {
      console.error("Signup Error:", err);
      res.status(400).send({ status: 400, message: "Could not complete signup operation." });
    }
    if (req.body.userType === 'Organization') {
      var orgData = {
        name: req.body.org_name,
        username: req.body.username,
        password: hash
      };
      console.log("app.post/orgData:",orgData);
      // Controller.Organization.create(req, res, next, orgData);
      Model.Organization.create(orgData, function(err, org) {
        if (err) {
          console.log("app.post/error:",err);
        }
        console.log("app.post/org:",org);
        req.session.user = { uid: org._id, type: 'organization' };
        res.send({ status: 201, token: req.session.user.uid });
      });
    } else if (req.body.userType === 'Donor') {
      var donorData = {
        name: { first: req.body.first_name, last: req.body.last_name },
        email: req.body.email,
        username: req.body.username,
        password: hash
      };
      Model.Donor.create(donorData, function(err, donor) {
        req.session.user = { uid: donor._id, type: 'donor' };
        res.send({ status: 201, token: req.session.user.uid });
      });
    }
  });
});

app.post('/login_post', function(req, res, next) {
  //check if user is a donor
  Model.Donor.findOne({ username: req.body.username }, function(err, donor) {
    if (err) {
      console.error("Login Error:", err);
      res.status(400).send({ status: 400, message: "Login Error." });
    }
    if (donor) { //is user a donor
      bcrypt.compare(req.body.pwd, donor.password, function(err, result) {
        if (err) {
          console.error("Login Error:", err);
          res.status(400).send({ status: 400, message: "Login validation failed." });
        } else {
          if (result) {
            //create session
            req.session.user = { uid: donor._id, type: 'donor' };
            console.log('Session has been set');
            res.status(201).send({ status: 201, token: req.session.user.uid });
          } else { //found donor but password doesn't match
            res.status(400).send({ status: 400, message: "Invalid username/password combination" });
          }
        }
      });
    } else {
      //check if user is an organization
      Model.Organization.findOne({ username: req.body.username }, function(err, org) {
        if (err) {
          console.error("Login Error:", err);
          res.status(400).send({ status: 400, message: "Login Error." });
        }
        if (org) { //is user an organization
          bcrypt.compare(req.body.pwd, org.password, function(err, result) {
            if (err) {
              console.error("Login Error:", err);
              res.status(400).send({ status: 400, message: "Login validation failed." });
            }
            if (result) {
              //create session
              req.session.user = { uid: org._id, type: 'organization' };
              console.log('Session has been set');
              res.send({ status: 201, token: req.session.user.uid });
            } else { //found org but password doesn't match
              res.status(400).send({ status: 400, message: "Invalid username/password combination" });
            }
          });
        } else { //did not find user in either donor or organization collection
          res.status(400).send({ status: 400, message: "User not found" });
        }
      });
    }
  });
});

app.post('/logout_post', function(req, res) {
  console.log('here')
  req.session.destroy(function(err) {
    console.log('destroyed session')
    res.status(201).send({status: 201, message: 'User has been logged out'});
  });
});
// app.post('/dashboard_data', function(req, res, next) {
//   if (req.session && req.session.user) {
//     if (req.session.user.type === 'organization') {
//       if (req.body.view === 'about') {
//         console.log("About: ", req.body.about)
//         Controller.Organization.update(req, res, next, { _id: req.session.user.uid },
//           { about: req.body.about, areas_of_focus: req.body.areas_of_focus });
//       }
//     } else if (req.session.user.type === 'donor') {
//       Controller.Donor.update(req, res, next, { _id: req.session.user.uid });
//     }
//   } else {
//     res.status(401).send({ status: 401, message: "Unauthorized to access dashboard" });
//   }
// });

app.post('/dashboard/profile', function(req, res, next) {
  if (req.session && req.session.user) {
    if (req.session.user.type === 'organization') {
      io.emit('data', 'Organization that you follow has updated their profile');
        Controller.Organization.update(req, res, next, { _id: req.session.user.uid },
          { about: req.body.about, areas_of_focus: req.body.areas_of_focus },
          'name username about areas_of_focus');
    } else if (req.session.user.type === 'donor') {
      console.log('Am a donor')
      Controller.Donor.update(req, res, next, { _id: req.session.user.uid },
        { name: req.body.name, email: req.body.email, areas_of_focus: req.body.areas_of_focus },
        'name username email areas_of_focus');
    }
  } else {
    res.status(401).send({ status: 401, message: "Unauthorized to access dashboard" });
  }
});

app.post('/dashboard/project/create', function(req, res, next) {
  if (req.session && req.session.user) {
      var newProject = req.body.projectData;
      newProject._org = req.session.user.uid;
      console.log('New Project:', newProject);
      Model.Project.create(newProject, function(err, project) {
        if (err) { throw err; }
        else {
          Model.Organization.findOne({_id: req.session.user.uid}, function(err, org) {
            if (err) { throw err; }
            else {
              org.projects.push(project);
              org.save(function(err, org) {
                if (err) { throw err; }
                else {
                  console.log("new project here");
                  res.status(201).send({ status: 201, message: "You are logged in" });
                }
              });
            }
          });
        }
      });
  } else {
    res.status(401).send({ status: 401, message: "Unauthorized to access dashboard" });
  }
});

app.post('/dashboard/profile_img/upload', multer().single('profile_img'), function(req, res, next) {
  Model.Organization.findById({ _id: req.session.user.uid }, function(err, org) {
    if (err) { console.error(err); res.status(400).send('Could not retrieve data'); }
    else {
      console.log('Org Name: ', org.name);
      console.log("Files: ", req.file);
      // console.log("Body: ", req.body);
        org.profile_img.data = req.file.buffer;
        org.profile_img.contentType = req.file.mimetype;
        org.profile_img.filename = req.file.originalname;
        // org.profile_img.path = new Buffer(req.file.buffer).toString('base64');
        org.save(function(err, currOrg) {
          if (err) { console.error("Profile Image save error: ", err); }
          res.status(201).send({ status: 201, results: {
            contentType: currOrg.profile_img.contentType,
            filename: currOrg.profile_img.filename }
          });
        });
      // var img = new Buffer(org.profile_img.data).toString('base64');
      // res.contentType(org.profile_img.contentType);
      // console.log(org.profile_img.data);
      // res.send(img);
    }
  });
});

app.post('/dashboard/media/upload', multer().array('media'), function(req, res, next) {
  console.log("Files: ", req.files);
  //  console.log("Body: ", req.body);
  req.files.forEach(function(file) {
    console.log(file);
    //generate an object id
    var fileId = _db.types.ObjectId();
    var writeStream = _db.gridfs.createWriteStream({
      _id: fileId,
      length: Number(file.size),
      chunkSize: 1024,
      filename: file.originalname,
      content_type: file.mimetype,
      mode: 'w',
      metadata: {
        org: req.session.user.uid
      }
    });

    streamifier.createReadStream(file.buffer).pipe(writeStream);
    writeStream.on('close', function() {
      console.log("File write was successful");
      //store fileId in media property of organization or project
      Model.Organization.findById({ _id: req.session.user.uid }, function(err, org) {
        if (err) { throw err; }
        else {
          if (file.mimetype.slice(0, 6) === 'image/') { org.images.push(fileId); }
          else if (file.mimetype.slice(0, 6) === 'video/') { org.videos.push(fileId); }
          org.save(function(err, updatedOrg) {
            if (err) { throw err; }
            else {
              res.status(201).send({ status: 201, message: "Media upload successful." });
            }
          });
        }
      });
    });
  });
});

app.post('/post_search', function(req, res, next) {
  var aofs = req.body.aofs.map(function (aof) {
    // return '(\\b' + aof + '\\b)';
    return capitalizeFirstLetter(aof);
  });
  // aofs.join('|');
  console.log("Aofs: ", req.body.aofs);
  Model.Organization.find({areas_of_focus: {$in: req.body.aofs}}, function (err, orgs) {
    if (err) {
      console.log(err);
      res.status(400).send('Could not retrieve data');
    }
    else {
      // console.log("Orgs: ", orgs)
      orgs.forEach(function (org, idx) {
        if (org.profile_img.contentType) {
          // console.log("Org: ", org.profile_img.contentType);
          var img = new Buffer(org.profile_img.data).toString('base64');
          org.img = img;
        }
      });
      Model.Project.find({areas_of_focus: {$in: req.body.aofs}}, function (err, projects) {
        if (err) throw err;
        else {
          // res.contentType(org.contentType);
          // res.contentType('multipart/mixed');
          res.status(201).send({status: 201, results: {orgs: orgs, projects: projects}});
          // res.send()
        }
      });
    }
  });
});

//app.get('/', function(req, res) {
//  console.log("Get Index Page");
//  res.sendFile(path.join(__dirname, '../client', 'index.html'));
//});

// app.get('*', function (req, res) { // This wildcard method handles all requests
//     Router.run(routes, req.path, function (Handler, state) {
//         var element = React.createElement(Handler);
//         var html = React.renderToString(element);
//         res.render('main', { content: html });
//     });
// });
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).

app.get('*', function (req, res, next){
  // res.sendFile(path.resolve(__dirname, './../client', 'index.html'));
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

//new WebpackDevServer(webpack(config), {
//  publicPath: config.output.publicPath,
//  hot: true,
//  historyApiFallback: true
//}).listen(4000, 'localhost', function (err, result) {
//  if (err) {
//    console.log(err);
//  }
//
//  console.log('Listening at localhost:4000');
//});
