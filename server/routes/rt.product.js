const debug = require('debug')('cygnus:router:product');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const prodApi = require('../api/api.product');

const query = function(res, condition) {
    prodApi.select(condition)
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

// Get products by id string.
router.get('/:idstr', (req, res) => {
    let ids = _.split(req.params.idstr, ',');
    let cond = {};
    if (ids.length <= 1) {
        cond.id = parseInt(ids[0]);
    } else {
        cond.id = {
            $in: _.map(ids, parseInt)
        };
    }
    query(res, cond);
});

module.exports = router;