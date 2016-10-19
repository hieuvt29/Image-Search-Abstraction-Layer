var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new mongoose.Schema({
  term: String,
  when: String
});

var History = mongoose.model('History', historySchema);

module.exports = History;