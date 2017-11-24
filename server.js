const VERSION = 'v0.2.2';

const debug = require('debug')('cygnus:server');
const path = require('path');
const fs = require('fs');
const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const settings = require('./server/settings');

// Initialize logger.
const logdir = path.join(__dirname, 'logs');
if (!fs.existsSync(logdir)) {
    fs.mkdirSync(logdir);
}

const log = require('winston');
log.configure({
    level: 'debug',
    transports: [
        new log.transports.Console({
            colorize: true
        }),
        new log.transports.File({
            filename: path.join(logdir, 'log.log')
        })
    ],
    exceptionHandlers: [
        new log.transports.Console({
            colorize: true
        }),
        new log.transports.File({
            filename: path.join(logdir, 'exceptions.log')
        })
    ]
});

// Initialze mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect(settings.mongo.addr, {
    useMongoClient: true
});
mongoose.set('debug', function(coll, method, query, docs) {
    let msg = util.format('Execute query "%s" on collection "%s" by method "%s"',
        JSON.stringify(query), coll, method);
    log.debug(msg);
});

// Initialize express framework.
const app = express();

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(compression());

// Register global error handler.
app.use(function(err, req, res, next) {
    log.exception(err);
    res.status(500).send(err);
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Register all api routers.
app.use('/cygnus/api/auth', require('./server/api/api.authorize'));
app.use('/cygnus/api/project', require('./server/api/api.project'));
app.use('/cygnus/api/product', require('./server/api/api.product'));
app.use('/cygnus/api/user', require('./server/api/api.user'));
app.use('/cygnus/api/word', require('./server/api/api.word'));
app.use('/cygnus/api/workorder', require('./server/api/api.workorder'));

// Handle static resource requests.
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', function(req, res) {
    debug(req.method + ' ' + req.url);
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

// Start server.
const server = app.listen(8051, function() {
    const host = server.address().address
    const port = server.address().port

    log.info("Server listening at http://%s:%s", host, port);
});

// Export server object for testing.
module.exports = server;