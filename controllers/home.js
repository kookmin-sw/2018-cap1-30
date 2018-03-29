var MSG = require('../model/MSG');
var os = require('os');
var ifaces = os.networkInterfaces();
var http = require('http');
var request = require('request');
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
exports.go_another_page = function(req, res) {
 res.render('page2', {
    title: 'page2'
  });
  console.log(res.body);
};


/**
 * POST /page2
 */
exports.send_sequest = function(req, res) {
  console.log(req.body);
  msg = new MSG({
    start_Username: 'teeeest',
    script_name: 'eeest'
  });
  //request.get("http://localhost:3005");
  var options = {
    method:'POST',
    uri: 'http://169.254.39.225:3030',
    body: msg,
    json: true
  };
  request(options);

  res.redirect('/page2');

};
