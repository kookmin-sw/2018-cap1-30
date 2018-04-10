var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var exec = require('child_process').exec;
var async = require('async');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('view');
});

app.post('/', function(req, res) {
  var id = req.body._id;
  var name = req.body.name;
  var standardOut = "";
  var read = JSON.parse(req.body.read);
  var write = JSON.parse(req.body.write);
  var rand = JSON.parse(req.body.rand);

  var readwrite_arr = new Array(2);
  readwrite_arr[0] = new Array(2);
  readwrite_arr[1] = new Array(2);
  readwrite_arr[0][0] = new Array(2);
  readwrite_arr[0][1] = new Array(2);
  readwrite_arr[1][0] = new Array(2);
  readwrite_arr[1][1] = new Array(2);

  readwrite_arr[0][0][0] = "error";
  readwrite_arr[0][0][1] = "error";
  readwrite_arr[0][1][0] = "write";
  readwrite_arr[0][1][1] = "randwrite";
  readwrite_arr[1][0][0] = "read";
  readwrite_arr[1][0][1] = "randread";
  readwrite_arr[1][1][0] = "rw";
  readwrite_arr[1][1][1] = "randrw";

  console.log(req.body);

  async.series([

      function(callback) {
        var script_form =
        "ioengine=libaio \n direct=1 \n numjobs=1 \n group_reporting=1 \n time_based=1 \n invalidate=1 \n norandommap=1 \n randrepeat=0 \n log_avg_msec=1000 \n  write_bw_log=./tmp/bw \n write_iops_log=./tmp/iops \n write_lat_log=./tmp/lat \n" +
        "[fio_job] \n filename=/dev/nvme0n1 \n #filename=/dev/md0";

        var config = "[global] \n readwrite=" + readwrite_arr[read][write][rand] + "\n";
        for(var i in req.body){
          if(i == 'name' || i == 'read' || i == 'write' || i == 'rand' || i == '_id'){
            continue;
          }
          else{
            config += i+ "=" + req.body[i] +"\n";
          }
        }

        fs.writeFile('/root/fio_script/'+name, config+script_form, 'utf-8', function(err){
          if(err){
            console.log(err);
          }
          console.log("write script success");
          callback(null,'0');
        });
      },

      function(callback) {
        fs.appendFile('/root/fio_script/run.sh', "fio "+ name + '\n', function(err) {
          if (err) {
            console.log(err);
          }
          console.log("Write script.txt Success");
          callback(null, '1');
        });
      },

      function(callback) {
        exec('cd /root/fio_script; fio '+name, function(err, stdout, stderr) {
          console.log(stdout);
          console.log(stderr);
          if (err != null) {
            console.log("error: " + err);
          }else{
            standardOut += stdout;
          }
          console.log("Exec test Success");
          callback(null, '2');
        });
      },

      function(callback) {
        var logList = fs.readdirSync('/mnt/c/Users/fadu-4/nodejsWorkplace/testServer/server/log'); //로그파일 이름
        var logNameList = new Array('bw', 'iops', 'clat', 'lat', 'slat', 'id', 'stdout');
        var jsonList = new Object(); // 최종 json 데이터

        for (var i = 0; i < logList.length; i++) {
          var data = fs.readFileSync('/mnt/c/Users/fadu-4/nodejsWorkplace/testServer/server/log/' + logList[i], 'utf-8');
          var resultList = new Array(); //한 log파일에 대한 데이터
          var arr = data.split('\n');
          for (var j = 0; j < arr.length - 1; j++) {
            var sub = new Object();
            arr[j] = arr[j].split(', ');
            sub['time'] = arr[j][0];
            sub['value'] = arr[j][1];
            sub['r/w'] = arr[j][2];
            sub['unknown'] = arr[j][3];

            resultList[j] = sub;
          }
          jsonList[logNameList[i]] = resultList;
        }
        jsonList[logNameList[5]] = id;
        jsonList[logNameList[6]] = standardOut;
        res.json(jsonList);
      }
    ],

    function(err, results) {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.listen(3000, function() {
  console.log("Connected Test Server(port 3000)");
});
