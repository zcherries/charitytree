var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;

var OrganizationSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  address: { type: String, required: true, trim: true },
  about: { type: String, required: true },
  signup_date: Date,
  // areas_of_focus: [{ type: ObjectId, ref: 'AoF' }],
  areas_of_focus: [String],
  profile_img: {
    data: Buffer,
    contentType: String
  },
  media: [ObjectId],
  projects: [{ type: ObjectId, ref: 'Project' }],
  endorsements: [{ type: ObjectId, ref: 'Donor' }]
});

var Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
