var mongoose = require('mongoose');
var grid = require('gridfs-stream');
grid.mongo = mongoose.mongo;

var url = 'mongodb://localhost:27017/charity_tree';

mongoose.connect(url);
var connection = mongoose.connection;
// console.log(connection);
var gridfs = grid(connection.db);

module.exports.connection = connection;
module.exports.gridfs = gridfs;
module.exports.types = mongoose.Types;
// var mongoose = require('mongoose');
// var grid = require('gridfs-stream');
// var Schemas = require('../db/models');
// grid.mongo = mongoose.mongo;
//
// var url = 'mongodb://localhost:27017/charity_tree';
//
// var connection = module.exports.connection = mongoose.createConnection(url);
//
// connection.once('open', function() {
//   console.log('Connection is Open')
//   var Organization = module.exports.Organization = connection.model('Organization', Schemas.Organization);
//   var Donor = module.exports.Donor = connection.model('Donor', Schemas.Donor);
//   var Project = module.exports.Project = connection.model('Project', Schemas.Project);
//   var AoF = module.exports.AoF = connection.model('AoF', Schemas.AoF);
//   var gridfs = module.exports.gridfs = grid(connection.db);
// });
