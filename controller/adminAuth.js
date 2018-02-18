var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    Admin = require('../model/admin');

var adminLogin = (req, res, next) => {
    var adminEmail = req.body.adminEmail,
        adminPassword = req.body.adminPassword;
    if (!adminEmail || !adminPassword)
        return res.status(201).json({success: false, message: 'Incomplete or invalid information.'});
    Admin.findOne({adminEmail: adminEmail}, (err, admin) => {
        if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
        if (!admin) return res.status(201).json({ success: false, message: 'Admin does not exist.' });
        admin.comparePassword(adminPassword, (err, isMatch) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            if (!isMatch) return res.status(201).json({ success: false, message: 'Invalid Admin Credentials' });
            var token = jwt.sign(admin, config.secret, { expiresIn: config.tokenexp });
            return res.status(201).json({ success: true, data: admin, token: token });
        });
    });
};

var adminAuthenticate = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['authorization'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            req.decoded = decoded;
            if (req.decoded._doc.adminEmail == null) return res.status(201).json({ success: false, message: 'Please login as Admin' });
            next();
        });
    } else {
        return res.status(201).json({ success: false, message: 'No token provided' });
    }
};

module.exports = {
    adminLogin,
    adminAuthenticate
}
