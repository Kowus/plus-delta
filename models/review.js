var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Review = new Schema({
  title: { type: String, required: true, trim: true },
  resolved: Boolean,
  postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  message: { type: String, required: true },
  class: {
    type: String,
    enum: ['plus', 'delta']
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course'
  },
  blurred: {
    type: Boolean,
    default: false
  },
  votes: [
    {
      user: { type: String, trim: true },
      up: Boolean
    }
  ]
});
module.exports = mongoose.model('Review', Review);
