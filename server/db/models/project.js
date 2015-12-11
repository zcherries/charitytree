var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;

var ProjectSchema = new Schema({
  org: { type: ObjectId, ref: 'Organization' },
  start_date: Date,
  end_date: Date,
  status: String,
  is_complete: Boolean,
  title: String,
  info: { type: String, trim: true, required: true },
  areas_of_focus: { type: [String], required: true },
  amount: {
    goal: Number,
    current: Number
  },
  needs_list: [{
    title: String,
    description: String,
    cost: Number,
    quantity_needed: Number,
    number_purchsed: Number,
    number_participants: Number
  }],
  updates: [{ title: String, date: Date, description: String }],
  // comments: [{ type: ObjectID, ref: 'Donor', comment: String, date: Date }],
  // faqs: [{title: String, description: String}],
  sponsors: [{ type: ObjectId, ref: 'Donor' }],
  media: [ObjectId]
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
