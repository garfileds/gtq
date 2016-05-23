var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (!req.session.user) {
        req.session.err = '用户未登录';
        res.sendstatus(500);
    } else {
    	res.render('client/upload', {
	        title: 'GTQ系统-图片上传',
	        userCode: req.session.user.code
	            // userCode: 'user1' //test code
	    });
    }
});

module.exports = router;
