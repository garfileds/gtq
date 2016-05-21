var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/view', { title: 'GTQ型单兵巡护通讯系统' });
});

module.exports = router;
