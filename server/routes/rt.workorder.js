const debug = require('debug')('cygnus:router:workorder');
const express = require('express');
const router = express.Router();
const woApi = require('../api/api.workorder');

const query = function (res, condition) {
    woApi.select(condition)
        .then((workorders) => {
            res.json({
                code: 0,
                data: workorders
            });
        });
}

// Get all workorders 
router.get('/', function (req, res) {
    query(res);
});

// Query workorders by condition.
router.post('/query', (req, res) => {
    let cond = req.body.condition;
    query(res, cond);
});

// Get workorder by _id.
router.get('/:id', (req, res) => {
    let cond = {
        _id: req.params.id
    }
    query(res, cond);
});

// Insert workorder.
router.post('/', (req, res) => {
    let wo = req.body.item;
    woApi.insert(wo)
        .then((workorder) => {
            res.json({
                code: 0,
                data: workorder
            });
        });
});

module.exports = router;