var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Review = new Schema(
  {
    title: { type: String, required: true, trim: true },
    resolved: Boolean,
    postedBy: String,
    date: { type: Date, default: Date.now },
    message: { type: String, required: true },
    class: {
      type: String,
      enum: ['plus', 'delta']
    },
    course: { type: String, required: true, trim: true },
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
  },
  {
    toObject: { virtuals: true }
  }
);

Review.virtual('owner', {
  ref: 'User',
  localField: 'postedBy',
  foreignField: 'id',
  justOne: true
});

// populate with 'owner' field
Review.virtual('program', {
  ref: 'Course',
  localField: 'course',
  foreignField: 'id',
  justOne: true
});

module.exports = mongoose.model('Review', Review);
