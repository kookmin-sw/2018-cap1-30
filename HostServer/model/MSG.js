var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};
//simple data type
var MSGSchema = new mongoose.Schema({
  start_Username: { type: String, unique: true},
  script_name: String
});


var MSG = mongoose.model('MSG', MSGSchema);

module.exports = MSG;
