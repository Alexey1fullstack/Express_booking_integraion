'use strict';

var express = require('express');
var registerRoutes = require('../routes');
var setEnvironment = require('../config/env');
var connectToDB = require('../config/db');

var app = express();

setEnvironment(app);
connectToDB();
registerRoutes(app);

// All non-API requests made to the server, for example, http://www.homepage.com/,
// will hit this request, which just returns the main layout, html file
app.get('*', function (req, res) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
        return res.send('Running server in development mode.');
    } else {
        // Returns the main index file in production environment
        return res.sendFile('index.html', { root: __dirname + '/../dist/' });
    }
});

// Starts the server on the given port
app.listen(process.env.PORT, function () {
    console.log('MEVN app listening on port ' + process.env.PORT + ' in ' + process.env.NODE_ENV + ' mode!');
});