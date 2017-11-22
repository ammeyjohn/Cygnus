const debug = require('debug')('cygnus:api:word');
const express = require('express');
const router = express.Router();
const WordService = require('../service/srv.word');

// Send a request to get a word object by code.
router.get('/:code', (req, res) => {
    let code = req.params.code;
    if (!code) {
        res.status(500).send('Invalid argument');
        return;
    }

    let service = new WordService();
    return service.getByCode(code)
        .then(ret => {
            res.json({
                code: 0,
                data: ret
            });
        })
        .fail(err => {
            res.status(500).send('GET /word/:code error');
        });
});

module.exports = router;