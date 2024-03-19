var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var nsx= "abc";

    res.render('product', { name: "nuoc" , gia : "2000d",nsX : nsx});
});

module.exports = router;
