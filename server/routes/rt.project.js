var debug = require('debug')('cygnus:router:project');
var express = require('express');
var router = express.Router();
var prjApi = require('../api/api.project');

// Get all actived projects 
router.get('/', function (req, res) {
    prjApi.getProjects().then((products) => {
        res.json({
            code: 0,
            data: products
        });
    });
});

module.exports = router;