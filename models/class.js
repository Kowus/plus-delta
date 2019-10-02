var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  codes
});
module.exports = mongoose.model('Class', ClassSchema);
