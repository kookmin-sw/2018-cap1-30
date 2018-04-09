var scriptSchema = require('../model/script');

exports.post =  function(req, res){
    console.log(req.body);
    var body = req.body;
    var script = new scriptSchema();

    for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        script[key] = req.body[key];
      }
    }
    script.save(function(err) {
        if(err) {
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});

    });
};
