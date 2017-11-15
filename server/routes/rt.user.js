const debug = require('debug')('cygnus:router:user');
const express = require('express');
const router = express.Router();
const userApi = require('../api/api.user');

const query = function(res, condition) {
    userApi.select(condition)
        .then((users) => {
            res.json({
                code: 0,
                data: users
            });
        });
}

// Get all actived users 
router.get('/', function(req, res) {
    query(res);
});

// Query users by condition.
router.post('/', (req, res) => {
    let cond = req.body.condition;
    query(res, cond);
});

// Get users by ids.
router.get('/:idstr', (req, res) => {
    userApi.selectByIds(req.params.idstr)
        .then((users) => {
            res.json({
                code: 0,
                data: users
            });
        });
});

module.exports = router;