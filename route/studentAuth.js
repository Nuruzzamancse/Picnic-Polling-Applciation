var express = require('express'),
    router = express.Router(),
    studentAuthController = require('../controller/studentAuth');

router.post('/login', studentAuthController.studentLogin);
router.post('/authenticate', studentAuthController.studentAuthenticate);

module.exports = router;