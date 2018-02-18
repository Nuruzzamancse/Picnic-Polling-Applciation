var Admin = require('../model/admin');

var createAdmin = (req, res, next) => {
    var adminUsername = req.body.adminUsername,
        adminEmail = req.body.adminEmail,
        adminPassword = req.body.adminPassword;
    if (!adminUsername || !adminEmail || !adminPassword)
        return res.status(201).json({success: false, message: 'Incomplete or invalid information.'});
    Admin.findOne({adminEmail: adminEmail}, (err, admin) => {
        if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
        if (admin) return res.status(201).json({ success: false, message: 'Place already exists.', data: admin });
        var newAdmin = new Admin({ adminUsername: adminUsername, adminEmail: adminEmail, adminPassword: adminPassword });
        newAdmin.save((err, admin) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            return res.status(201).json({ success: true, data: admin });
        });
    });
};

var getAllAdmins = (req, res, next) => {
    Admin.find((err, admins) => {
        if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
        return res.status(201).json({ success: true, data: admins });
    });
};

var getAdmin = (req, res, next) => {
    var adminId = req.params.id;
    if (!adminId) {
        return res.status(201).json({success: false, message: 'Incomplete or invalid information or parameter.'});
    } else {
        Admin.findById(adminId, (err, admin) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            if (!admin) return res.status(400).json({ success: false, message: 'No admin found.' });
            return res.status(201).json({ success: true, data: admin });
        });
    }
};

var updateAdmin = (req, res, next) => {
    var adminUsername = req.body.adminUsername,
        adminEmail = req.body.adminEmail,
        adminId = req.params.id;
    if (!adminUsername || !adminEmail || !adminId)
        return res.status(201).json({success: false, message: 'Incomplete or invalid information.'});
    Admin.findById(adminId, (err, admin) => {
        if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
        admin.adminUsername = adminUsername;
        admin.adminEmail = adminEmail;
        admin.save((err, admin) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            return res.status(201).json({ success: true, data: admin });
        });
    });
};

var deleteAdmin = (req, res, next) => {
    var adminId = req.params.id;
    if (!adminId) {
        return res.status(201).json({success: false, message: 'Incomplete or invalid information or parameter.'});
    } else {
        Admin.findByIdAndRemove(adminId, (err, admin) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            return res.status(201).json({ success: true, message: 'Removed the admin.' });
        });
    }
};

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin
};