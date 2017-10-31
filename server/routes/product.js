var debug = require('debug')('cygnus:router:project');
var express = require('express');
var router = express.Router();
var prodApi = require('../api/product');

// Get all actived products
router.get('/', function (req, res) {
    prodApi.getProducts().then((products) => {
        res.json({
            code: 0,
            data: products
        });
    });
});

module.exports = router;