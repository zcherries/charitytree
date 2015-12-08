var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;

var ProjectSchema = new Schema({
  org: { type: ObjectId, ref: 'Organization' },
  info: { type: String, trim: true, required: true },
  start_date: Date,
  end_date: Date,
  status: String,
  areas_of_focus: { type: [String], required: true },
  amount: {
    goal: Number,
    current: Number
  },
  sponsors: [{ type: ObjectId, ref: 'Donor' }],
  media: [ObjectId]
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
