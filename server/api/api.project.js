const debug = require('debug')('cygnus:api:project');
const express = require('express');
const router = express.Router();
const ProjectService = require('../service/srv.project');


// Get all actived projects.
router.get('/all', (req, res) => {
    var service = new ProjectService();
    service.getAllProjects(true)
        .then(ret => {
            res.json({
                code: 0,
                data: ret
            });
        })
        .fail(err => {
            res.status(500).send('GET /project/all error');
        });
});

// Get a project by specified project id.
router.get('/:id', (req, res) => {
    let prjId = req.params.id;
    if (prjId) {
        prjId = parseInt(prjId);
    }

    var service = new ProjectService();
    service.getProjectById(prjId)
        .then(ret => {
            res.json({
                code: 0,
                data: ret
            });
        })
        .fail(err => {
            res.status(500).send('GET /project/:id error');
        });
});




module.exports = router;