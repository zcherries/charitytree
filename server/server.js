var express = require('express');

var _db = require('./db/connection.js');
var Controller = require('./db/controllers');
var Model = require('./db/models');

var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');

var path = require('path');
var fs = require('fs');
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

// app.use('/dashboard_data/*', function validateSession (req, res, next) {
//   console.log('Validation Starts')
//   console.log('Req.Path: ', req.path)
//   console.log(req.session.user)
//   if (req.session && req.session.user) {
//     next();
//   } else {
//     console.log('Redirecting...')
//     res.redirect(301, '/');
//   }
// });

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

//================================== GET ====================================//

app.get('/dashboard_data', function(req, res, next) {
  // console.log('body: ', req.headers)
  if (req.session && req.session.user) {
    console.log('In session');
    if (req.session.user.type === 'organization') {
      Model.Organization.findOne({_id: req.session.user.uid}).select('-password -profile_img.data')
        .populate('projects endorsements')
        .lean()
        .exec(function(err, org) {
          if (err) {throw err;}
          else {
            res.status(200).send({status: 200, results: org, userType: req.session.user.type });
          }
        });
    } else if (req.session.user.type === 'donor') {
      Model.Donor.findOne({ _id: req.session.user.uid }).select('-password')
        .populate('sponsored_projects following')
        .lean()
        .exec(function(err, donor) {
        if (err) { console.log(err); }
        else {
          var keys = ['feed', 'images', 'password', 'videos', 'areas_of_focus']
          donor.following.forEach(function(obj) {
            keys.forEach(function(key) {
              delete obj[key];
            });
          });
          res.send({ status: 200, results: donor, userType: req.session.user.type });
        }
      });
    }
  } else {
    res.status(401).send({ status: 401, message: "Unauthorized to access dashboard" });
    // console.log('Redirecting...')
    // res.redirect(301, '/logout');
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

app.get('/dashboard_data/org/media/:id', function(req, res, next) {
  //req.params.id is the fileId of file stored in gridfs
  var readstream = _db.gridfs.createReadStream({ _id: req.params.id });
  readstream.pipe(res);
});

app.get('/dashboard_data/project/media/:id', function(req, res, next) {
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
  // Controller.Organization.retrieve(req, res, next,{username: 'goodguys'});
  // Model.Donor.findOne({username: 'jjohnson'}, function(err, donor) {
  //   if (err) throw err;
  //   else {
  //     var i = donor.endorsements.length;;
  //     while (i--) {
  //       var endorsement = donor.endorsements[i];
  //       endorsement.remove();
  //     }
  //     donor.save(function(err, updatedDonor) {
  //       res.send(updatedDonor);
  //     });
  //   }
  // })
});

app.get('/organization_get/:id', function(req, res, next) {
 // console.log('Org ID: ', req.body.orgID);
 console.log("inside of server.js and req.params.id is ",req.params.id);
 var id = req.params.id;
 if (id) {
   Model.Organization.findOne({ _id: id }).select('-password -feed -profile_img.data')
    .lean()
    .populate('projects').exec(function(err, org) {
     if (err) throw err;
     else {
       res.status(200).send({status: 200, results: org });
     }
   });
 }
});

app.get('/organization/profile_img/:id', function(req, res, next) {
  Model.Organization.findById(req.params.id, function (err, org) {
    if (err) throw err;
    else {
      if (org) {
        streamifier.createReadStream(org.profile_img.data).pipe(res);
      } else {
        res.status(400).send({status: 400, message: "Error"})
      }
    }
  });
});

app.get('/project_get/:id', function(req, res, next) {
 // console.log('Org ID: ', req.body.orgID);
 console.log("inside of server.js and req.params.id is ",req.params.id);
 var id = req.params.id;
 Model.Project.findOne({ _id: id }).select().populate('_org').lean()
  .exec(function(err, project) {
   if (err) throw err;
   else {
    var keys = ['feed', 'password', 'followers', 'profile_img'];
    keys.forEach(function(key) {
         delete project._org[key];
     });
     res.status(200).send({status: 200, results: project });
   }
 });
});

app.get('/dashboard_data/profile_img/:user/:filename', function(req, res, next) {
  console.log(req.params);
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

app.post('/logout_post', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      console.error("err",err);
    }
    console.log('destroyed session');
    res.status(201).send({status: 201, message: 'User has been logged out'});
  });
});

app.post('/organization/follow/:id', function(req, res, next) {
  console.log('In Server Follow: ' + req.params.id);
  var now = new Date();
  if (req.session && req.session.user && req.params.id) {
    Model.Organization.findById(req.params.id, function(err, org) {
      if (err) { console.error(err); }
      if (org) {
        Model.Donor.findById(req.session.user.uid, function(err, donor) {
          if (err) { console.error(err); }
          if (donor) {
            org.followers.push(req.session.user.uid);
            org.feed.push({
              user: donor.name.first + " " + donor.name.last,
              message: "started following you",
              created_date: now
            });
            org.save(function(err) {
              if (err) { console.error(err); }
              donor.following.push(org._id);
              donor.feed.push({
                user: donor.name.first + " " + donor.name.last,
                message: 'started following ' + org.name,
                created_date: now
              });
              donor.save(function() {
                res.status(201).send({status: 201, message: 'Success'});
              });
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({status: 400, message: 'Could not complete the operation'});
  }
});

app.post('/dashboard/profile', function(req, res, next) {
  if (req.session && req.session.user) {
    if (req.session.user.type === 'organization') {
      Model.Organization.findById(req.session.user.uid)
        .select('name username about areas_of_focus')
        .exec(function(err, org) {
        if (err) throw err;
        if (org) {
          console.log(org)
          org.about = req.body.about;
          org.areas_of_focus = req.body.areas_of_focus;
          org.save(function(err, updatedOrg) {
            if (err) throw err;
            else {
              console.log('Made update');
              // feed.emit('org_update', updatedOrg._id, {message: updatedOrg.name + ' has updated their profile', attachment: ''});
              res.status(201).send({ status: 201, results: updatedOrg });
            }
          });
        }
      });
    } else if (req.session.user.type === 'donor') {
      Model.Donor.findById(req.session.user.uid, 'name username email areas_of_focus', function(err, donor) {
        if (err) throw err;
        if (donor) {
          donor.name = req.body.name;
          donor.email = req.body.email;
          donor.areas_of_focus = req.body.areas_of_focus;
          donor.save(function(err, updatedDonor) {
            if (err) throw err;
            else { res.status(201).send({ status: 201, results: updatedDonor }); }
          });
        }
      });
      // Controller.Donor.update(req, res, next, { _id: req.session.user.uid },
      //   { name: req.body.name, email: req.body.email, areas_of_focus: req.body.areas_of_focus },
      //   'name username email areas_of_focus');
    }
  } else {
    res.status(401).send({ status: 401, message: "Unauthorized to access dashboard" });
  }
});

app.post('/dashboard/project/create', function(req, res, next) {
  console.log('in server projcreate and req.body is ', req.body);
  if (req.session && req.session.user) {
      var newProject = req.body.projectData;
      newProject._org = req.session.user.uid;
      console.log('New Project:', newProject);
      Model.Project.create(newProject, function(err, project) {
        if (err) {
          res.status(400).send({ status: 400, message: "Unauthorized to access dashboard" });
          throw err;
        }
        else {
          Model.Organization.findOne({_id: req.session.user.uid}, function(err, org) {
            if (err) { throw err; }
            else {
              org.projects.push(project); //save project to organization's array of projects
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
      org.profile_img.data = req.file.buffer;
      org.profile_img.contentType = req.file.mimetype;
      org.profile_img.filename = req.file.originalname;
      org.feed.push({
        user: org.name,
        message: 'changed profile image',
        attachment: 'http://54.213.164.135/organization/profile_img/'+ org._id,
        attachment_type: 'image',
        created_date: new Date()
      });
      org.save(function(err, currOrg) {
        if (err) { console.error("Profile Image save error: ", err); }
        console.log(currOrg.feed)
        res.status(201).send({ status: 201, results: {
          contentType: currOrg.profile_img.contentType,
          filename: currOrg.profile_img.filename }
        });
      });
    }
  });
});

app.post('/dashboard/org/media/upload', multer().array('media'), function(req, res, next) {
  console.log("Files: ", req.files);
  //  console.log("Body: ", req.body);
  req.files.forEach(function(file) {
    console.log(file);
    //generate an object id
    var fileId = _db.types.ObjectId();
    var writeStream = _db.gridfs.createWriteStream({
      _id: fileId,
      length: Number(file.size),
      chunkSize: 1024 * 4,
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
      //store fileId in media property of organization
      Model.Organization.findById({ _id: req.session.user.uid }, function(err, org) {
        if (err) { throw err; }
        else {
          if (file.mimetype.slice(0, 6) === 'image/') { org.images.push(fileId); }
          else if (file.mimetype.slice(0, 6) === 'video/') { org.videos.push(fileId); }
          org.feed.push({
            user: org.name,
            message: 'uploaded a new ' + file.mimetype.slice(0, 5),
            attachment: 'http://54.213.164.135/dashboard_data/org/media/'+ fileId,
            attachment_type: file.mimetype.slice(0, 5),
            created_date: new Date()
          });
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

app.post('/dashboard/project/media/upload', multer().array('media'), function(req, res, next) {
  // console.log("Files: ", req.files);
  // console.log("Body: ", req.body);
  req.files.forEach(function(file) {
    //generate an object id
    var fileId = _db.types.ObjectId();
    var writeStream = _db.gridfs.createWriteStream({
      _id: fileId,
      length: Number(file.size),
      chunkSize: 1024 * 4,
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
      //store fileId in images/videos property of project
      Model.Project.findById({ _id: req.body.project }, function(err, project) {
        if (err) { throw err; }
        else {
          if (file.mimetype.slice(0, 6) === 'image/') { project.images.push(fileId); }
          else if (file.mimetype.slice(0, 6) === 'video/') { project.videos.push(fileId); }
          project.save(function(err, updatedProject) {
            if (err) { throw err; }
            else {
              Model.Organization.findById(project._org || req.session.user.uid, function(err, org) {
                if (err) throw err;
                if (org) {
                  org.feed.push({
                    user: org.name,
                    message: 'uploaded a new '+ file.mimetype.slice(0, 5) + ' for project: ' + project.title,
                    attachment: 'http://54.213.164.135/dashboard_data/project/media/'+ fileId,
                    attachment_type: file.mimetype.slice(0, 5),
                    created_date: new Date()
                  });
                }
              });
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
    return new RegExp('\\b' + aof.toLowerCase() + '\\b', 'i');
  });
  Model.Organization.find({areas_of_focus: {$in: aofs}})
    .select('-password -feed -profile_img.data')
    .exec(function (err, orgs) {
      if (err) {
        console.error(err);
        res.status(400).send('Could not retrieve data');
      } else {
        Model.Project.find({areas_of_focus: {$in: aofs}}, function (err, projects) {
          if (err) throw err;
          else {
            res.status(201).send({ status: 201, results: {orgs: orgs, projects: projects} });
          }
        });
      }
  });
});

app.post('/dashboard/project/update', function(req, res, next) {
  console.log("Body: ", req.body);
  res.send('Success')
});

app.post('/dashboard/project/needs/update', function(req, res, next) {
  console.log("Body: ", req.body);
  Model.Project.findById(req.body._id, function(err, project) {
    if (err) console.error(err);
    if (project) {
      console.log('Found project');
      project.amount.current = req.body.amount.current;
      req.body.needs_list.forEach(function(need) {
        var pn = project.needs_list.id(need._id);
        pn.quantity_needed = need.quantity_needed;
        pn.number_participants = (pn.number_participants == null) ? 1 : pn.number_participants++;
      });
      project.total_donors_participating = (project.total_donors_participating == null)
        ? 1
        : project.total_donors_participating++;
      project.save(function(err, updatedProject) {
        if (err) throw err;
        console.log('Project saved:', updatedProject);
        res.status(201).send({status: 201, data: updatedProject });
      });
    } else {
      res.status(400).send({status: 400, message: 'Could not complete request'});
    }
  });
});

app.post('/dashboard/donor/endorsement', function(req, res, next) {
  Model.Endorsement.findOne(req.body.title, function(err, found) {
    if (err) console.error(err);
    if (!found) {
      Model.Endorsement.create(req.body, function(err, endorsement) {
        if (err) console.error(err);
        if (endorsement) {
          Model.Organization.findById(endorsement.org, function(err, org) {
            if (err) console.error(err);
            if (org) {
              org.endorsements.push(endorsement._id);
              org.save();
            }
          });
          Model.Donor.findById(endorsement.author, function(err, donor) {
            if (err) console.error(err);
            if (donor) {
              donor.endorsements.push(endorsement._id);
              donor.save();
            }
          });
          res.status(201).send({status: 201, results: req.session.user.uid});
        }
      });
    } else {
      res.status(400).send({status: 400, message: 'Endorsement already exists'});
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
