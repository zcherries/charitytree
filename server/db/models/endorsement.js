var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;

var EndorsementSchema = new Schema({
  title: { type: String, trim: true },
  review: { type: String, trim: true },
  rating: Number,
  review_date: Date,
  org: { type: ObjectId, ref: 'Organization' },
  author: { type: ObjectId, ref: 'Donor' }
});

var Endorsement = mongoose.model('Endorsement', EndorsementSchema);

module.exports = Endorsement;
