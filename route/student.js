var express = require('express'),
    router = express.Router(),
    student = require('../model/student'),
    studentController = require('../controller/student'),
    studentAuthController = require('../controller/studentAuth');
    adminAuthController = require('../controller/adminAuth');

router.post('/', studentController.createStudent);
router.get('/', adminAuthController.adminAuthenticate, studentController.getAllStudents);
router.get('/:id', studentAuthController.studentAuthenticate, studentController.getStudent);
router.patch('/:id', studentAuthController.studentAuthenticate, studentController.updateStudent);
router.delete('/:id', adminAuthController.adminAuthenticate, studentController.deleteStudent);

module.exports = router;