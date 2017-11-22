const debug = require('debug')('cygnus:api:workorder');
const express = require('express');
const router = express.Router();
const WOService = require('../service/srv.workorder');

// Send a post request to create a new workorder object.
router.post('/', (req, res) => {

    let order = req.body.order;
    if (!order) {
        res.status(400).send('Invalid argument');
        return;
    }

    let service = new WOService();
    service.addOrder(order)
        .then(ret => {
            res.status(201)
                .json({
                    code: 0,
                    data: ret
                });
        })
        .fail(err => {
            res.status(500).send('POST /workorder/ error');
        });

});

module.exports = router;