var debug = require('debug')('cygnus:router:product');
var express = require('express');
var router = express.Router();
var prodApi = require('../api/api.product');

let query = function(res, condition) {
    prodApi.getProducts(condition)
        .then((products) => {
            res.json({
                code: 0,
                data: products
            });
        });
}

// Get all actived products
router.get('/', (req, res) => {
    query(res);
});

// Get actived products by id
router.get('/:id', (req, res) => {
    let cond = {
        id: parseInt(req.params.id)
    }
    query(res, cond);
});

// Query actived products by condition.
router.post('/', (req, res) => {
    let cond = req.body.condition;
    query(res, cond);
});

module.exports = router;