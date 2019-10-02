var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  codes: String
});
module.exports = mongoose.model('Class', ClassSchema);
