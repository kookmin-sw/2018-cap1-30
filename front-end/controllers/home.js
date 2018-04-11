var MSG = require('../model/MSG');
var os = require('os');
var ifaces = os.networkInterfaces();
var http = require('http');
var request = require('request');
var async = require('async');


/**
 * GET /
 */
exports.index = function(req, res) {
  //res.sendFile('/client/public/index.html',{root:__dirname});/*
  res.sendFile('C:/Users/1G/Desktop/final/public/index.html');

};

exports.result = function(req, res){
    res.sendFile('C:/Users/1G/Desktop/final/public/result.html');
}

/**
 * GET /page2
 */
exports.go_start_page = function(req, res) {
  res.render('page2', {
     title: 'page2'
   });
  console.log(res.body);
};


/**
 * POST /page3
 */
exports.send_request = function(req, res) {
  msg = new MSG({
    start_Username: 'test',
    script_name: 'eeest'
  });
  var tmp = "";

  async.waterfall(
    [
      function(callback){
        var options = {
          method:'POST',
          uri: 'http://169.254.131.180:3000',
          //uri: 'http://localhost:3005',
          body: msg,
          json: true
        };
        request(options, function(err, res, body) {
          if(err)
          {
            console.log(err);
            callback(true);
            return;
          }
          console.log(body);
          obj = res.body;
          tmp = res.body;
          callback(false, obj);
        });


      },
    function(){
      res.render('page3', {
         title: 'page3',
         time: Date(),
         result: tmp
       });

    }
    ], function(err, result){
      if(err) {
        console.log(err);
        res.send(500, 'Server Error');
        return;
      }
      res.send({api1:result[0]},{api2:result[1]});
    }
  )
};
