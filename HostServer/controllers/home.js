var MSG = require('../model/MSG');
var os = require('os');
var ifaces = os.networkInterfaces();
var http = require('http');
var request = require('request');
var async = require('async');
/*

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});

*/

/**
 * GET /
 */
exports.index = function(req, res) {

  res.render('home', {
    title: 'Home'
  });

};

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
