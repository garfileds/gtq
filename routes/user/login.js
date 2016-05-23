var express = require('express');
var router = express.Router();

router.route('/').get(function(req, res) {
    res.render('web/login', {
        title: 'GTQ-登录'
    });
}).post(function(req, res) {
    var User = global.dbHandel.getModel('user');

    var uname = req.body.username,
        password = req.body.password;

    User.findOne({
        name: uname
    }, function(err, doc) {
        if (err) { 
            res.sendStatus(500);
            console.log(err);
        } else if (!doc) {
            res.sendStatus(500);
        } else {
            if (password != doc.password) {
                res.sendStatus(500);
            } else {
                req.session.user = doc;

                if (doc.code === 'admin') {
                    res.redirect('/web/view');
                } else {
                    res.sendStatus(200);
                }
            }
        }
    });
});

module.exports = router;