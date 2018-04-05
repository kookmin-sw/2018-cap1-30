var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var exec = require('child_process').exec;
var async = require('async');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('view');
});

app.post('/', function(req, res){
  var name = req.body.script_name;
  console.log(req.body);
  var tasks = [
    function(callback){
      fs.writeFile('/root/fio_Test_xlxs/controller/exec-list', name+'\n', function(err){
        if(err){
          console.log(err);
        }
        console.log("Write exec-list.txt Success");
      });
      callback(null, "write");
    },
    function(callback){
      exec('cd /root/fio_Test_xlxs/controller; sh do-test', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        if(err != null){
          console.log("error: " + err);
        }
        res.send(stdout);
      });
      callback(null, "stdout");
    }
  ];
  async.series(tasks, function(err, results){
    console.log(results);
  });
});

app.listen(3000, function(){
  console.log("Connected Test Server(port 3000)");
});
