const VERSION = 'v0.1.1';
const debug = require('debug')('cygnus:server');
const path = require('path');
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');

// Logger

const logdir = path.join(__dirname, 'logs');
if (!fs.existsSync(logdir)) {
    fs.mkdirSync(logdir);
}

const log = require('winston');
log.configure({
    level: 'debug',
    transports: [
        new log.transports.Console(),
        new log.transports.File({
            filename: path.join(logdir, 'log.log')
        })
    ],
    exceptionHandlers: [
        new log.transports.File({
            filename: path.join(logdir, 'exceptions.log')
        })
    ]
});

const app = express();

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(err, req, res, next) {
    res.status(500).send(err);
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const authApi = require('./server/api/api.authorize');
const prjApi = require('./server/api/api.project');
const prodApi = require('./server/api/api.product');
const userApi = require('./server/api/api.user');
const wordApi = require('./server/api/api.word');
const woApi = require('./server/api/api.workorder');
app.use('/cygnus/api/auth', authApi);
app.use('/cygnus/api/project', prjApi);
app.use('/cygnus/api/product', prodApi);
app.use('/cygnus/api/user', userApi);
app.use('/cygnus/api/word', wordApi);
app.use('/cygnus/api/workorder', woApi);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', function(req, res) {
    debug(req.method + ' ' + req.url);
    res.sendFile(path.join(__dirname, './dist/index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

const server = app.listen(8051, function() {
    const host = server.address().address
    const port = server.address().port

    log.info("Server listening at http://%s:%s", host, port);
});

module.exports = server;