var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Course = new Schema({
  id: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
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
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Course', Course);
