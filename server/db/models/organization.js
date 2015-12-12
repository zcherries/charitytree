var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;

var OrganizationSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  username:{ type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, trim: true },
  about: { type: String },
  signup_date: Date,
  // areas_of_focus: [{ type: ObjectId, ref: 'AoF' }],
  areas_of_focus: [String],
  profile_img: {
    data: Buffer,
    contentType: String
  },
  media: [ObjectId],
  projects: [{ type: ObjectId, ref: 'Project' }],
  endorsements: [{ type: ObjectId, ref: 'Donor' }],
  img: { type: String, default: '' }
});

OrganizationSchema.pre('save', function(next) {
  var now = Date();
  if (!this.signup_date) {
    this.signup_date = now;
  }
  next();
});

var Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
