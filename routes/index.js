var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/uploads/:image', function (req, res, next) {
  res.sendfile(__dirname + '/uploads/ ' +req.params.image);
});


router.post('/files', upload.single('image'), function (req, res, next) {
    if(req.file === undefined || req.file === null){
            return res.json({
                success: false,
                message: "Error occurred"
            })
        }
	
	cloudinary.uploader.upload(req.file.path, function(result) {
        console.log(result);
		if(result.error){
			return res.json({
                success: false,
                message: "Invalid image file"
            })
		}
        var image = result.url;
        res.json({
            success: true,
            image: image
        });
    });
});

module.exports = router;
