var mongoose = require('mongoose');
var { Schema } = mongoose;

var Department = new Schema({
  name: {
    type: String,
    required: true
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  head: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Department', Department);
