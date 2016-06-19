var express = require('express');
var router = express.Router();

var request = require('request');
var mkdirp = require('mkdirp');
var fs = require('fs');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // 生成目标文件夹
        var destDir = 'public/upload/';
        // 判断文件夹是否存在
        fs.stat(destDir, (err) => {
            if (err) {
                // 创建文件夹
                mkdirp(destDir, (err) => {
                    if (err) {
                        cb(err);
                        console.log('创建文件夹失败');
                    } else {
                        console.log('创建文件夹成功');
                        cb(null, destDir);
                        console.log('写了文件2');
                    }
                });
            } else {
                console.log('写了文件');
                cb(null, destDir);
            }
        });
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    }
});
var upload = multer({
    storage: storage
});
var cpUpload = upload.single('Filedata');

router.post('/', cpUpload, function(req, res) {
    console.log('start!');
    console.log('Content-Type: ' + req.get('Content-Type'));
    console.log('fileName: ' + req.file.filename);
    if (!global.user) {
        res.json({code: 1, desc: '用户未登录'});
    }
    
    var Location = global.dbHandel.getModel('location');

    var x = new Number(req.body.x).valueOf(),
        y = new Number(req.body.y).valueOf(),
        imgUrl = '/upload/' + req.file.filename;
    console.log('地理位置，x:' + x + 'y: ' + y);

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
                    userId: global.user._id,
                    userCode: global.user.code
                    // userId: '573fd5db00adc2f02f15701d' //test code
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
