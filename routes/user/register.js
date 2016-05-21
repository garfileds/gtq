var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    var User = global.dbHandel.getModel('user');

    var uname = req.body.username,
    	upwd = req.body.password;

    User.findOne({
        name: uname
    }, function(err, doc) { // 同理 /login 路径的处理方式
        if (err) {
            /*res.json({
            	code: 1,
            	desc: '网络异常'
            });*/
            res.sendStatus(500);
            console.log(err);
        } else if (doc) {
            /*res.json({
            	code: 2,
            	desc: '用户名已存在'
            });*/
            res.sendStatus(500);
        } else {
            User.create({ // 创建一组user对象置入model
                name: uname,
                password: upwd
            }, function(err, doc) {
                if (err) {
                    /*res.json({
		            	code: 1,
		            	desc: '网络异常'
		            });*/
		            res.sendStatus(500);
                } else {
                    /*res.json({
		            	code: 0,
		            	desc: '用户创建成功'
		            });*/
		            res.sendStatus(200);
                }
            });
        }
    });
});

module.exports = router;
