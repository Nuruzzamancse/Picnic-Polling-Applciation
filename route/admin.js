var express = require('express'),
    router = express.Router(),
    admin = require('../model/admin'),
    adminController = require('../controller/admin');

router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdmin);
router.patch('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;