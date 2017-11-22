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

// Send a request to get users by id string seperated by comma.
// router.get('/:idstr', (req, res) => {
//     res.status(500);
// });

// Send a request to get a user object.
router.get('/', (req, res) => {
    let promise = null;

    let fuzzy = false;
    if (req.query.mode === 'fuzzy') {
        fuzzy = true;
    }

    let condition = {
        name: req.query.name,
        userName: req.query.username,
        email: req.query.email
    }

    let service = new UserService();
    return service.getUser(condition, fuzzy)
        .then(ret => {
            res.json({
                code: 0,
                data: ret
            });
        })
        .fail(err => {
            res.status(500).send('GET /user/ error');
        });
});

// Send a request to query users.
router.get('/query', (req, res) => {
    let promise = null;

    let condition = {
        name: req.query.name,
        userName: req.query.username,
        email: req.query.email
    }

    let service = new UserService();
    return service.queryUser(condition, true)
        .then(ret => {
            res.json({
                code: 0,
                data: ret
            });
        }).fail(err => {
            res.status(500).send('GET /user/query error');
        });
});


module.exports = router;