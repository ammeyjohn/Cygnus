const debug = require('debug')('cygnus:api:user');
const express = require('express');
const router = express.Router();
const UserService = require('../service/srv.user');

// Send a post request to create a new user object.
router.post('/', (req, res) => {

    let user = req.body.user;
    if (!user) {
        res.status(400).send('Invalid argument');
        return;
    }

    let service = new UserService();
    service.addUser(user)
        .then(ret => {
            res.status(201)
            .json({
                code: 0,
                data: ret
            });
        })
        .fail(err => {
            res.status(500).send('POST /user/ error');
        });

});


module.exports = router;