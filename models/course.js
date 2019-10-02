var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Course = new Schema({
  id: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  code: { type: String },
  teachers: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      main: { type: Boolean, default: false }
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  class: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Class'
    }
  ]
});

module.exports = mongoose.model('Course', Course);
