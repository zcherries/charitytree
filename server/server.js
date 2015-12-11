var express = require('express');
var path = require('path');
var Controller = require('./db/controllers');
var Model = require('./db/models');
var connection = require('./db/connection.js');
var organizations = require('./resources/organizations.js');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var streamifier = require('streamifier');

var multerOptions = {
  upload: null,
  onFileUploadStart: function (file) {
    //set upload with WritableStream
    console.log("File: ", file)
    this.upload = connection.gridfs.createWriteStream({
        filename: file.originalname,
        mode: "w",
        chunkSize: 1024*4,
        content_type: file.mimetype,
        root: "fs",
        metadata: {
          org_id: '123'
        }
    });
  },

 onFileUploadData: function (file, data) {
    //put the chucks into db
    this.upload.write(data);
 },

 onFileUploadComplete: function (file) {
    //end process
    // this.upload.on('drain', function () {
    console.log("Got to complete")
        this.upload.end();
    // });
 }
}
// var upload = multer({ dest: 'uploads/' })
// var busboy = require('connect-busboy');

// var util = require('util');
// var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
// var log_stdout = process.stdout;
// console.log = function(d) { //
//   log_file.write(util.format(d) + '\n');
//   log_stdout.write(util.format(d) + '\n');
// };

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// app.use(busboy());

// app.use(multer({ dest: './uploads/'}));

var IP = '127.0.0.1', PORT = 4000;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

 var file_exists = function(options) {
  connection.gridfs.exist(options, function (err, found) {
    if (err) {
      console.error(err);
      return false;
    }
    return found ? true : false;
  });
}

app.post('/signup', function(req, res, next) {
  console.log('Body: ', req.body)
  if (req.body.userType === 'Organization') {
    Controller.Organization.create(req, res, next, orgData);
  } else if (req.body.userType === 'Donor') {
    Controller.Donor.create(req, res, next, donorData);
  }
});

 app.post('/media_upload', multer().array('media'), function(req, res, next) {
   console.log("Files: ", req.files);
  //  console.log("Body: ", req.body);

  //  req.files.forEach(function(file) {
  //    console.log(file);
  //    //create and object id
  //    var fileId = mongoose.Types.ObjectId();
  //    var writeStream = connection.gridfs.createWriteStream({
  //      _id: fileId,
  //      length: Number(file.size),
  //      chunkSize: 1024 * 4,
  //      filename: file.originalname,
  //      content_type: file.mimetype,
  //      mode: 'w',
  //      metadata: {
  //        org: req.body.org_id
  //      }
  //    });
  //    streamifier.createReadStream(file.buffer).pipe(writeStream);
  //    writeStream.on('close', function() {
  //      console.log("File write was successful");
  //      //store fileId in media property of organization or project
  //    });
  //  });

   return res.status(200).send({ message: 'Success' });
  //  res.send({success: true});
  // res.sendStatus(200);
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

app.get('/image', function(req, res) {
  console.log('Inside GET Image')
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
  Controller.Organization.retrieve(req, res, next);
});

app.get('/get_browse', function(req, res, next) {
  Controller.AoF.retrieve(req, res, next);
});

app.post('/post_search', function(req, res, next) {
  var aofs = req.body.aofs.map(function(aof) {
    // return '(\\b' + aof + '\\b)';
    return capitalizeFirstLetter(aof);
  });
  // aofs.join('|');
  console.log("Aofs: " + aofs);
  Model.Organization.find({ areas_of_focus: { $in: aofs } }, function(err, orgs) {
    if (err) { console.log(err); res.status(400).send('Could not retrieve data'); }
    else {
      // console.log("Orgs: ", orgs)
      orgs.forEach(function(org, idx) {
        if (org.profile_img.contentType) {
          console.log("Org: ", org.profile_img.contentType)
          var img = new Buffer(org.profile_img.data).toString('base64');
          org.img = img;
        }
      });
      Model.Project.find({ areas_of_focus: { $in: aofs } }, function(err, projects) {
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
// app.get('*', function (req, res){
//   res.sendFile(path.resolve(__dirname, './../client', 'index.html'))
// });

app.listen(PORT, IP);
