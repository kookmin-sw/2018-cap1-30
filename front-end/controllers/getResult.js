var scriptSchema = require('../model/script');
var resultSchema = require('../model/result');
var detailSchema = require('../model/detail');
var data = require('../public/result.json')
exports.index = function(req, res) {
  res.json(data)
};
