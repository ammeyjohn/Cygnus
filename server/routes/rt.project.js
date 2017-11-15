const debug = require('debug')('cygnus:router:project');
const express = require('express');
const router = express.Router();
const prjApi = require('../api/api.project');

const query = function(res, condition) {
    prjApi.select(condition)
        .then((projects) => {
            res.json({
                code: 0,
                data: projects
            });
        });
}

// Get all actived projects 
router.get('/', function(req, res) {
    query(res);
});

// Query projects by condition.
router.post('/', (req, res) => {
    let cond = req.body.condition;
    query(res, cond);
});

// Get project by id.
router.get('/:id', (req, res) => {
    let cond = {
        id: parseInt(req.params.id)
    }
    query(res, cond);
});

module.exports = router;