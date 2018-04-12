var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var scriptSchema = require('../model/script');

var resultSchema = new Schema({
  script_id: { type: Schema.Types.ObjectId, ref: 'script' },
  summary_data: String,
  details: [{ type: Schema.Types.ObjectId, ref: 'detail' }]
});

var result = mongoose.model('result', resultSchema);

module.exports = result;
