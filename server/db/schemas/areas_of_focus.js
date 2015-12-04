var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;

var AoFSchema = new Schema({
  name: String,
  tags: [String],
  count: { type: Number, default: 0 }
});

var AoF = mongoose.model('AoF', AoFSchema);
