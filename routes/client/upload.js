var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('client/upload', {
  	title: 'GTQ系统-图片上传',
  	// userCode: req.session.user.code
  	userCode: 'user1' //test code
  });
});

module.exports = router;

