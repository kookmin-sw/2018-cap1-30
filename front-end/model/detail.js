var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var scriptSchema = require('../model/result');

var detailSchema = new Schema({
  result_id: { type: Schema.Types.ObjectId, ref: 'result' },
  times:[],
  values:[]
});

var detail = mongoose.model('detail', detailSchema);

module.exports = detail;
