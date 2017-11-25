const express = require('express');
const router = express.Router();
const _ = require('lodash');
const util = require('../utils');
const UserService = require('../service/srv.user');
const usersrv = new UserService();

router.get('/:id', (req, res) => {
    let userId = req.params.id;
    if (!userId || !Number.isInteger(userId)) {
        res.status(400).send('Invalid argument "id"');
        return;
    }

    usersrv.getUserById(userId)
        .then(ret => {
            res.json({
                code: 0,
                data: ret
            });
        })
        .fail(err => {
            res.status(500).send('GET /user/' + userId + ' error');
        });
});

router.get('/', (req, res) => {

    let queryParams = util.queryParse(req.query);

    let condition = {};
    if (req.query.id)
        condition.id = _.map(_.split(req.query.id, ','), Number);
    if (req.query.name)
        condition.name = req.query.name;
    if (req.query.username)
        condition.userName = req.query.username;
    if (req.query.email)
        condition.email = req.query.email;
    if (Object.getOwnPropertyNames(condition) == 0)
        condition = null;

    return usersrv.getUsers(condition, queryParams)
        .then(ret => {
            res.json(ret);
        })
        .fail(err => {
            res.status(500).send('GET /user/ error');
        });
});

// Query users by condition from querystring with fuzzy mode.
// router.get('/query', (req, res) => {

//     let condition = {
//         name: req.query.name,
//         userName: req.query.username,
//         email: req.query.email
//     }

//     return usersrv.queryUser(condition, true)
//         .then(ret => {
//             res.json({
//                 code: 0,
//                 data: ret
//             });
//         }).fail(err => {
//             res.status(500).send('GET /user/query error');
//         });
// });

router.post('/', (req, res) => {

    let user = req.body.user;
    if (!user) {
        res.status(400).send('Invalid argument "user"');
        return;
    }

    usersrv.addUser(user)
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