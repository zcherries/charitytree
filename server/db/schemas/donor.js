var mongoose = require('mongoose');
var ObjectId = Schema.Types.ObjectId;

var Donor = new mongoose.Schema({
  name: { first: String, last: String },
  email: String,
  password: String,
  signup_date: Date,
  profile_img: { data: Buffer, contentType: String },
  areas_of_focus: { type: [String], required: true },
  projects: [ProjectSchema],
  endorsements: [{ type: ObjectId, ref: 'Organization' }]
});
