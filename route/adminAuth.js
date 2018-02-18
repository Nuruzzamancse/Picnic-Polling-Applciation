var express = require('express'),
    router = express.Router(),
    adminAuthController = require('../controller/adminAuth');

router.post('/login', adminAuthController.adminLogin);
router.post('/authenticate', adminAuthController.adminAuthenticate);

module.exports = router;