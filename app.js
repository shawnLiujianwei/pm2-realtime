/**
 * Created by Shawn Liu on 2014/12/19.
 */
var express = require('express');
var config = require("config");
var app = express();
var logger = require("log4js").getLogger("app.js");
var server = require('http').createServer(app);
var PM2 = require("./lib/PM2");
require('./config/express')(app);
require('./routes')(app);

var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.on('monitor', function (msg) {
        logger.info("socket receive 'monitor':", msg);
        socket.emit("monitor", msg);
    });
    socket.on('disconnect', function () {
        logger.info("socket disconnect");
    });
});

        server.listen(config.port, function () {
            console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
        });
exports = module.exports = app;
