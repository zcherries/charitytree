var express = require('express');
var app = express();
app.use(require('morgan')('dev'));
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var session_helpers = require('./helpers/session-helpers.js');

var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var streamifier = require('streamifier');
var bcrypt = require('bcrypt-nodejs');

//var webpack = require('webpack');
//var WebpackDevServer = require('webpack-dev-server');
//var config = require('../client/webpack.config.js');
var Controller = require('./db/controllers');
var Model = require('./db/models');
var connection = require('./db/connection.js');
var organizations = require('./resources/organizations.js');
var project = require('./resources/projects.js');

// var upload = multer({ dest: 'uploads/' })
// var busboy = require('connect-busboy');

// var util = require('util');
// var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
// var log_stdout = process.stdout;
// console.log = function(d) { //
//   log_file.write(util.format(d) + '\n');
//   log_stdout.write(util.format(d) + '\n');
// };

// session middleware
app.use(session({
  name: 'server-session-cookie-id',
  secret: '@%20%23&amp;',
  saveUninitialized: false,
  resave: true,
  store: new FileStore(),
  cookie: { maxAge: 1000 * 60 * 60 }
}));

// app.use(function printSession(req, res, next) {
//   console.log('req.session', req.session);
//   return next();
// });

app.use('/dashboard', session_helpers.validateSession);

//================================= PARSERS ==================================/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// app.use(multer({ dest: './uploads/'}));

app.use(express.static(__dirname + '/../client'));

var IP = '127.0.0.1', PORT = 4000;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// var imgPath = 'C:/Users/T410/Documents/GitHub/charitytree/server/resources/Hydrangeas.jpg';

// organizations.forEach(function(org) {
// var newOrg = new Model.Organization(org);
// newOrg.save(function(err, obj) {
//   if (err) {
//     console.error("Error: ", err)
//   } else {
//     console.log("New organization has been added")
//   }
// });
// });

// Model.Project.create(project, function(error, result){
//  if(error) {
//    console.error(error)
//  }else {
//    console.log(result)
//  }
// });

// var renderWithData = function(req, res, next) {
//   res.renderWithData = function() {
//     res.render();
//   }
// }
//================================== GET ====================================//
app.get('/', function(req, res, next) {
  console.log("Get Index Page");
  res.send('index.html');
});

app.get('/logout', function(req, res, next) {
  if (req.session) {
    req.session.destroy();
  }
  res.send('index.html');
});

app.get('/dashboard', function(req, res, next) {
  if (req.session && req.session.user) {
    if (req.session.user.type === 'organization') {
      Controller.Organization.retrieve(req, res, next, { _id: req.session.user.uid });
    } else if (req.session.user.type === 'donor') {
      Controller.Donor.retrieve(req, res, next, { _id: req.session.user.uid });
    }
  } else {
    res.status(404).send({status: 404, message: "Cannot access dashboard"});
  }
});

app.get('/image', function(req, res) {
  var file_exists = function (options) {
    connection.gridfs.exist(options, function (err, found) {
      if (err) {
        console.error(err);
        return false;
      }
      return found ? true : false;
    });
  }
});

app.get('/donors', function(req,res,next) {
  Controller.Donor.retrieve(req,res,next,{});
});

app.get('/remove_media', function(req, res) {
  var options = { filename: 'Sleep Away.mp3' }
  // if (file_exists(options)) {
  connection.gridfs.remove(options, function (err) {
    if (err) console.log(err);
    else {
      console.log('success');
      res.send('Successfully deleted ' + options.filename);
    }
  });
  // }
});

app.get('/get_file', function (req, res) {
  //  connection.gridfs.chunks.find({ metadata: { org: '56663575f7ec540c2d469903'}})
  var readstream = connection.gridfs.createReadStream({ filename: '1_-_Introduction_to_NoSQL_Databases.mp4' });
  readstream.pipe(res);
});

app.get('/upload/profile_img', function(req, res) {
  console.log('Inside GET Image');
  Model.Organization.findById({_id:"56663575f7ec540c2d4698fb"}, function(err, org) {
    if (err) {console.error(err); res.status(400).send('Could not retrieve data'); }
    else {
      // console.log('Org Name: ', org.name);
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
  // Controller.Organization.retrieve(req, res, next, { name: "BRAC" });
  // Model.Organization.findOne({ name: "BRAC" }, function(err, org) {
  //   if (err) console.log(err)
  //   else {
  //     console.log(org)
  //     org.username = 'BRAC';
  //     org.password = "$2a$10$iT4mB1TEPWOR1u0/aHtoH.RHFLGmvKe9k2jJbgoS099cr.PtTeh6G";
  //     org.projects.push('566c71024e699e200eec5a3b');
  //     org.save(function(err, org) {
  //       if (err) console.error(err);
  //       else console.log(org);
  //     });
  //     res.send('got here');
  //   }
  // });
  // Controller.Organization.update(req, res, next, { name: "BRAC" }, {_id: "56663f998461000b5037cdf0" });
});

app.get('/projects', function(req, res, next) {
  // Controller.Project.retrieve(req, res, next);
  //Controller.Project.delete(req, res, next, {}, {}, 'find');
});

app.get('/get_browse', function(req, res, next) {
  Controller.AoF.retrieve(req, res, next);
});

//================================== POST ===================================//
app.post('/signup', function(req, res, next) {
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
      Controller.Organization.create(req, res, next, orgData);
    } else if (req.body.userType === 'Donor') {
      var donorData = {
        name: { first: req.body.first_name, last: req.body.last_name },
        email: req.body.email,
        username: req.body.username,
        password: hash
      };
      Controller.Donor.create(req, res, next, donorData);
    }
  });
});

app.post('/login', function(req, res, next) {
  console.log('Body: ', req.body);
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
            res.status(201).send({ status: 201, message: "Login successful" });
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
              res.send({ status: 200, message: "Login successful" });
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

app.post('/media_upload', multer().array('media'), function(req, res, next) {
  console.log("Files: ", req.files);
  //  console.log("Body: ", req.body);

  req.files.forEach(function(file) {
    console.log(file);
    //create and object id
    var fileId = mongoose.Types.ObjectId();
    var writeStream = connection.gridfs.createWriteStream({
      _id: fileId,
      length: Number(file.size),
      chunkSize: 1024 * 4,
      filename: file.originalname,
      content_type: file.mimetype,
      mode: 'w',
      metadata: {
        org: req.body.org_id
      }
    });
    streamifier.createReadStream(file.buffer).pipe(writeStream);
    writeStream.on('close', function() {
      console.log("File write was successful");
      //store fileId in media property of organization or project
    });
  });

  return res.status(200).send({ message: 'Success' });
});

app.post('/post_search', function(req, res, next) {
  var aofs = req.body.aofs.map(function (aof) {
    // return '(\\b' + aof + '\\b)';
    return capitalizeFirstLetter(aof);
  });
  // aofs.join('|');
  // console.log("Aofs: " + aofs);
  Model.Organization.find({areas_of_focus: {$in: aofs}}, function (err, orgs) {
    if (err) {
      console.log(err);
      res.status(400).send('Could not retrieve data');
    }
    else {
      // console.log("Orgs: ", orgs)
      orgs.forEach(function (org, idx) {
        if (org.profile_img.contentType) {
          console.log("Org: ", org.profile_img.contentType);
          var img = new Buffer(org.profile_img.data).toString('base64');
          org.img = img;
        }
      });
      Model.Project.find({areas_of_focus: {$in: req.body.aofs}}, function (err, projects) {
        if (err) throw err;
        else {
          // res.contentType(org.contentType);
          // res.contentType('multipart/mixed');
          res.send({status: 201, results: {orgs: orgs, projects: projects}});
          // res.send()
        }
      });
    }
  });
});

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, './../client', 'index.html'));
});


//new WebpackDevServer(webpack(config), {
//  publicPath: config.output.publicPath,
//  hot: true,
//  historyApiFallback: true
//})/*.listen(3000, 'localhost', function (err, result) {
//  if (err) {
//    console.log(err);
//  }
//  console.log('Listening at localhost:3000');
//})*/;

app.listen(PORT, IP);
