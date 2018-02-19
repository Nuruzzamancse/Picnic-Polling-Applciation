var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    Student = require('../model/student');

var studentLogin = (req, res, next) => {
    var studentEmail = req.body.studentEmail,
        studentPassword = req.body.studentPassword;
    if (!studentEmail || !studentPassword)
        return res.status(201).json({success: false, message: 'Incomplete or invalid information.'});
    Student.findOne({studentEmail: studentEmail}, (err, student) => {
        if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
        if (!student) return res.status(201).json({ success: false, message: 'Student does not exist.' });
        student.comparePassword(studentPassword, (err, isMatch) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            if (!isMatch) return res.status(201).json({ success: false, message: 'Invalid Student Credentials' });
            var token = jwt.sign(student, config.secret, { expiresIn: config.tokenexp });
            return res.status(201).json({ success: true, data: student, token: token });
        });
    });
};

var studentAuthenticate = (req, res, next) => {
    console.log('Student Auth');
    var token = req.body.token || req.query.token || req.headers['authorization'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(201).json({ success: false, message: 'No token provided' });
    }
};

module.exports = {
    studentLogin,
    studentAuthenticate
}
