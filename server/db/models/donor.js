var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;

var endorsementSchema = new Schema({
  review: { type: String, trim: true },
  rating: Number,
  org: { type: ObjectId, ref: 'Organization' }
});

var DonorSchema = new Schema({
  name: {
    first: { type: String, trim: true },
    last: { type: String, trim: true }
  },
  email: { type: String, required: true },
  password: {type: String, required: true },
  signup_date: Date,
  profile_img: { data: Buffer, contentType: String },
  areas_of_focus: [{ type: ObjectId, ref: 'AoF' }],
  sponsored_projects: [{ type: ObjectId, ref: 'Project' }],
  orgs_followed: [{ type: ObjectId, ref: 'Organization' }],
  endorsements: [endorsementSchema]
});

var Donor = mongoose.model('Donor', DonorSchema);

module.exports = Donor;
