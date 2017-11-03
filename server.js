var debug = require('debug')('cygnus:server');
var path = require('path');
var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');

// Logger
const log = require('winston');
log.configure({
    transports: [
        new log.transports.Console(),
        new log.transports.File({ filename: 'logs/log.log' })
    ],
    exceptionHandlers: [
        new log.transports.File({ filename: 'logs/exceptions.log' })
    ]
});

var productRouter = require('./server/routes/rt.product');
var projectRouter = require('./server/routes/rt.project');

var app = express();

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

app.use('/cygnus/api/product', productRouter);
app.use('/cygnus/api/project', projectRouter);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', function(req, res) {
    debug(req.method + ' ' + req.url);
    res.sendFile(path.join(__dirname, './dist/index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

var server = app.listen(8051, function() {
    var host = server.address().address
    var port = server.address().port

    log.info("Server listening at http://%s:%s", host, port);
});