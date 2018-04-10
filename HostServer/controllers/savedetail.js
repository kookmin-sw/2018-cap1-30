var detailSchema = require('../model/detail');
var async = require('async');

exports.post = function(req, res) {
  console.log(req.body.bw);
  //var body = req.body;
  var detail_iops = new detailSchema();
  var detail_bw = new detailSchema();
  var detail_lat = new detailSchema();
  var detail_clat = new detailSchema();
  var detail_slat = new detailSchema();

  detail_iops.logs = req.body.iops;
  detail_bw.logs = req.body.bw;
  detail_lat.logs = req.body.lat;
  detail_clat.logs = req.body.clat;
  detail_slat.logs = req.body.slat;

  async.waterfall(
    [
      function(callback) {
        detail_iops.save();
        callback(false);
      },
      function(callback) {
        detail_bw.save();
        callback(false);
      },
      function(callback) {
        detail_lat.save();
        callback(false);
      },
      function(callback) {
        detail_clat.save();
        callback(false);
      },
      function(callback) {
        detail_slat.save();
        callback(false);
      }
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        res.send(500, 'Server Error');
        return;
      }
      res.json({
        result: 1
      });
    }
  )

};
