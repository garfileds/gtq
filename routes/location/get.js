var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
    if (!global.user) {
        res.json({code: 1, desc: '用户未登录'});
    }
    
    var Location = global.dbHandel.getModel('location');

    /*test code*/
    /*if (req.session.user.code != 'admin') {
        req.session.user = {
            _id: '573fd5db00adc2f02f15701d',
            code: 'user1'
        };
    }*/
    /*test code end*/
    if (global.user.code === 'admin' || global.user.code === req.params.id) {
        Location.find({
            userCode: req.params.id
        }, function(err, doc) {
            if (err) { 
                res.sendStatus(500);
                console.log(err);
            } else {
                doc.map(function(location) {
                    delete location.userId;
                    return location;
                });
                res.json({code: 0, result: doc});
            }
        });
    } else {
        res.json({code: 1, desc: '权限不足'});
    }
});

module.exports = router;