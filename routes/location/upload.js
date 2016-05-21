var express = require('express');
var router = express.Router();

var request = require('request');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/freetime/gtq/public/upload');
    },
    filename: function(req, file, cb) {
        cb(null, '/upload/' + file.originalname);
    }
});
var upload = multer({
    storage: storage
});
var cpUpload = upload.single('goodImg');

// var formidable = require('formidable');

router.post('/', cpUpload, function(req, res) {
    var Location = global.dbHandel.getModel('location');

    var desc,
        x = req.body.x,
        y = req.body.y,
        img = req.file.filename;

    
});

module.exports = router;
