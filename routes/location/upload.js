var express = require('express');
var router = express.Router();

var request = require('request');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '~/gtq/public/upload');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
});
var cpUpload = upload.any();

router.post('/', cpUpload, function(req, res) {
    console.log('start!');
    console.log('Content-Type: ' + req.get('Content-Type'));
    console.log(req.body);
    /*if (!req.session.user) {
        res.json({code: 1, desc: '用户未登录'});
    }*/
    
    var Location = global.dbHandel.getModel('location');

    var x = new Number(req.body.x).valueOf(),
        y = new Number(req.body.y).valueOf(),
        imgUrl = '/upload/' + req.file[0].filename;

    //请求百度地图API
    var url = 'http://api.map.baidu.com/geocoder/v2/?ak=yrVn3NWk7BbtTNd5ONgPaF81gEE1cqXS&callback=renderLocation&location=' + y + ',' + x + '&output=json&pois=1';

    request(url, function (error, response, body) {
        //请求BMap url的回调函数
        var renderLocation = function(data) {
            if (data.status === 0) {
                Location.create({
                    x: x,
                    y: y,
                    img: imgUrl,
                    label: data.result.formatted_address,
                    // userId: req.session.user._id
                    userId: '573fd5db00adc2f02f15701d'
                }, function(err, doc) {
                    if (err) {
                        res.json({code: 1, desc: '网络异常'});
                        console.log(err);
                    } else {
                        res.json({code: 0, desc: '信息上传成功'});
                    }
                });
            }
        };

        if (!error && response.statusCode == 200) {
            eval(response.body);
            console.log('调用BMap API完成');
        }
    });
});

module.exports = router;
