var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scriptSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  name: String,
  read: Boolean,
  write: Boolean,
  rand: Boolean,
  rwmixwrite: Number,
  blocksize: Number,
  iodepth: Number,
  runtime: Number,
  thread: Number,
  results: [{ type: Schema.Types.ObjectId, ref: 'result' }]
});

var script = mongoose.model('script', scriptSchema);

module.exports = script;
