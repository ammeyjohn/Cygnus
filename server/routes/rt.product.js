const debug = require('debug')('cygnus:router:product');
const express = require('express');
const router = express.Router();
const prodApi = require('../api/api.product');

const query = function(res, condition) {
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

// Query products by condition.
router.post('/', (req, res) => {
    let cond = req.body.condition;
    query(res, cond);
});

// Get product by id.
router.get('/:id', (req, res) => {
    let cond = {
        id: parseInt(req.params.id)
    }
    query(res, cond);
});

module.exports = router;