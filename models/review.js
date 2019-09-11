var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Review = new Schema({
  title: { type: String, required: true },
  resolved: Boolean,
  postedBy: String,
  date: { type: Date, default: Date.now },
  message: { type: String, required: true },
  class: {
    type: String,
    enum: ['plus', 'delta']
  },
  course: { type: String, required: true }
});

module.exports = mongoose.model('Review', Review);
