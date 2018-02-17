var express = require('express'),
    router = express.Router(),
    student = require('../model/student'),
    studentController = require('../controller/student');

router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudent);
router.patch('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;