var express = require('express');
var router = express.Router();

var request = require('request');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '~/gtq/public/upload');
    },
    filename: function(req, file, cb) {
        cb(null, '/upload/' + file.originalname);
    }
});
var upload = multer({
    storage: storage
});
var cpUpload = upload.any();

router.post('/', function(req, res) {
    console.log('start!');
    if (!req.session.user) {
        res.json({code: 1, desc: '用户未登录'});
    }
    
    var Location = global.dbHandel.getModel('location');

    var x = new Number(req.body.x).valueOf(),
        y = new Number(req.body.y).valueOf(),
        imgUrl = req.file.filename;

    //请求百度地图API
    var url = 'http://api.map.baidu.com/geocoder/v2/?ak=yrVn3NWk7BbtTNd5ONgPaF81gEE1cqXS&callback=renderLocation&location=' + x + ',' + y + '&output=json&pois=1';

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            console.log('response: ' + data);
            console.log('x: ' + x);

            Location.create({
                x: x,
                y: y,
                img: imgUrl,
                label: data.formatted_address,
                userId: req.session.user._id
            }, function(err, doc) {
                if (err) {
                    res.json({code: 1, desc: '网络异常'});
                    console.log(err);
                } else {
                    res.json({code: 0, desc: '信息上传成功'});
                }
            });
        }
    });
});

module.exports = router;
