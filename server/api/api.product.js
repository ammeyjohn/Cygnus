const debug = require('debug')('cygnus:api:product');
const express = require('express');
const router = express.Router();
const ProductService = require('../service/srv.product');

// Get products by specified product id string.
router.get('/:idstr', (req, res) => {
    let idstr = req.params.idstr;
    if (!idstr || idstr.length === 0) {
        res.status(400).send('Invalid argument');
        return;
    }

    var service = new ProductService();
    service.getProductByIds(idstr)
        .then(ret => {
            res.json({
                code: 0,
                data: ret
            });
        })
        .fail(err => {
            res.status(500).send('GET /product/:idstr error');
        });
});

module.exports = router;