var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    cors = require('cors'),
    path = require('path');

var config = require('./config');

var placeRoutes = require('./route/place'),
    adminRoutes = require('./route/admin'),
    // adminAuthRoutes = require('./route/admin'),
    studentRoutes = require('./route/student'),
    studentAuthRoutes = require('./route/studentAuth');

var port = process.env.PORT || config.serverPort;

app.use(express.static(path.join(__dirname, 'public/dist')));

mongoose.Promise = global.Promise;
mongoose.connect(config.database, (err) => {
    if (err) {
        console.log('Error in database connection.');
    } else {
        console.log('Database connected');
}
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('body-parser').json('*/*'));

app.use(morgan('dev'));

app.use(cors());

app.use('/admin', adminRoutes);
app.use('/place', placeRoutes);
app.use('/student', studentRoutes);
app.use('/student-auth', studentAuthRoutes);

app.listen(port);
console.log('App is running in port: ' + port);
