var mongoose = require('mongoose');
var ObjectId = Schema.Types.ObjectId;

var Organization = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  about: { type: String, requied: true, match: /[a-z]/ },
  areas_of_focus: { type: [String], required: true },
  profile_img: { data: Buffer, contentType: String },
  media: [],
  projects: [ProjectSchema],
  endorsements: [{ type: ObjectId, ref: 'Donor' }],
  signup_date: Date
});
