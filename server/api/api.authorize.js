const debug = require('debug')('cygnus:api:authorize');
const express = require('express');
const router = express.Router();

const Authorize = require('../service/srv.authorize');

// User login with account and password
router.post('/login', (req, res) => {

    let loginInfo = req.body.loginInfo;
    if (!loginInfo) {
        res.status(400).send('Invalid login info');
        return;
    }

    let auth = new Authorize();
    auth.login(loginInfo.userName, loginInfo.password)
        .then((credential) => {
            res.json({
                code: 0,
                data: credential
            });
        })
        .fail((err) => {
            res.status(403).send('Permission denied');
        });
});

module.exports = router;