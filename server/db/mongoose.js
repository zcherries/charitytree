var mongoose = require('mongoose');
var grid = require('gridfs-stream');
grid.mongo = mongoose.mongo;

var url = module.exports.url = 'mongodb://localhost:27017/charity_collective';

var connection = mongoose.connect(url);
connection.once('open', function() {
  var gfs = grid(connection.db);
  
});

module.exports = connection;

var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;
