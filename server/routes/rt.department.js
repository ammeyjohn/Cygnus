const debug = require('debug')('cygnus:router:department');
const express = require('express');
const router = express.Router();
const deptApi = require('../api/api.department');

const query = function(res, condition) {
    deptApi.select(condition)
        .then((depts) => {
            res.json({
                code: 0,
                data: depts
            });
        });
}

// Get all actived depts 
router.get('/', function(req, res) {
    query(res);
});

// Query depts by condition.
// router.post('/', (req, res) => {
//     let cond = req.body.condition;
//     query(res, cond);
// });

// Get depts by ids.
router.get('/:idstr', (req, res) => {
    deptApi.selectByIds(req.params.idstr)
        .then((depts) => {
            res.json({
                code: 0,
                data: depts
            });
        });
});

module.exports = router;