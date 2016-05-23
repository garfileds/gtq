var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.session.user) {
        req.session.err = '用户未登录';
        res.redirect('/user/login');
    } else {
  		res.render('web/view', { title: 'GTQ型单兵巡护通讯系统' });
    }
});

module.exports = router;
