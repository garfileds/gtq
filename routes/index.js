var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('web/login', { title: 'GTQ-登录' });
});

module.exports = router;*/

router.get('/', function(req, res, next) {
	/*var signature = req.query.signature,
		timestamp = req.query.timestamp,
		nonce = req.query.nonce,
		echostr = req.query.echostr;

	var sha1, tmpStr;
	var tmpArr = [signature, timestamp, nonce];
	tmpArr.sort();

	sha1 = crypto.createHash('sha1');
	sha1.update(tmpArr.join(''));
	tmpStr = sha1.digest('hex');

	if (tmpStr === signature) {
		res.status(200).send(echostr);
	} else {
		res.status(500).send('error');
	}*/
	var echostr = req.query.echostr;
	res.status(200).send(echostr);
});
