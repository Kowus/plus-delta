var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Course = new Schema(
  {
    id: {
      type: String,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    teachers: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        main: { type: Boolean, default: false }
      }
    ],
    reviews: [
      {
        type: String
      }
    ],
    class: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Class'
      }
    ]
  },
  {
    toObject: { virtuals: true }
  }
);

Course.virtual('ratings', {
  ref: 'Review',
  localField: 'reviews',
  foreignField: 'id',
  justOne: true
});

Course.virtual('students', {
  ref: 'User',
  localField: 'class',
  foreignField: 'id',
  justOne: true
});

module.exports = mongoose.model('Course', Course);
