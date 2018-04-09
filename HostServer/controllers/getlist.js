var scriptSchema = require('../model/script');
var resultSchema = require('../model/result');
var detailSchema = require('../model/detail');

exports.index = function(req, res) {
    scriptSchema.find(function(err, script){
        if(err) return res.status(500).send({error: 'database failure'});
        var result='';
        for (var key in script) {
            result += script[key].name + ' ';
        }
        res.json(result);
    })
};
