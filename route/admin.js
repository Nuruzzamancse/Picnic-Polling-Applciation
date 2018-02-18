var express = require('express'),
    router = express.Router(),
    admin = require('../model/admin'),
    adminController = require('../controller/admin'),
    adminAuthController = require('../controller/adminAuth');

router.post('/', adminController.createAdmin);
router.get('/', adminAuthController.adminAuthenticate, adminController.getAllAdmins);
router.get('/:id', adminAuthController.adminAuthenticate, adminController.getAdmin);
router.patch('/:id', adminAuthController.adminAuthenticate, adminController.updateAdmin);
router.delete('/:id', adminAuthController.adminAuthenticate, adminController.deleteAdmin);

module.exports = router;