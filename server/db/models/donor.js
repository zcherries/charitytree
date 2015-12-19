var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;

var endorsementSchema = new Schema({
  review: { type: String, trim: true },
  rating: Number,
  review_date: Date,
  org: { type: ObjectId, ref: 'Organization' }
});

var DonorSchema = new Schema({
  name: {
    first: { type: String, trim: true, required: true },
    last: { type: String, trim: true, required: true }
  },
  username: {type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: {type: String, required: true },
  signup_date: Date,
  profile_img: { data: Buffer, contentType: String },
  // areas_of_focus: [{ type: ObjectId, ref: 'AoF' }],
  areas_of_focus: [String],
  sponsored_projects: [{ type: ObjectId, ref: 'Project' }],
  orgs_followed: [{ type: ObjectId, ref: 'Organization' }],
  endorsements: [endorsementSchema],
  feed: [{ content: Schema.Types.Mixed, created_date: Date }]
});

DonorSchema.pre('save', function(next) {
  var now = new Date();
  if (this.signup_date == null) {
    this.signup_date = now;
  }
  next();
});

var Donor = mongoose.model('Donor', DonorSchema);

module.exports = Donor;
// module.exports = DonorSchema;
