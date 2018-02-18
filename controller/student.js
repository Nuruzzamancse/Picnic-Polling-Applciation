var Student = require('../model/student');

var createStudent = (req, res, next) => {
    var studentName = req.body.studentName,
        studentRoll = req.body.studentRoll,
        studentEmail = req.body.studentEmail,
        studentPassword = req.body.studentPassword,
        isVoteAvailable = true,
        isApproved = false;

    if (!studentName || !studentRoll || !studentEmail || !studentPassword) {
        return res.status(201).json({success: false, message: 'Incomplete or invalid information.'});
    } else {
        Student.find({
            $or: [
                { studentEmail : studentEmail },
                { studentRoll: studentRoll }
            ]}, (err, results) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            if (results.length <= 0) {
                var student = new Student({
                    studentName: studentName,
                    studentRoll: studentRoll,
                    studentEmail: studentEmail,
                    studentPassword: studentPassword,
                    isVoteAvailable: isVoteAvailable,
                    isApproved: isApproved
                });
                student.save((err, student) => {
                    if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
                    return res.status(201).json({ success: true, data: student });
                });
            } else {
                return res.status(201).json({success: false, message: 'Student already exists.'});
            }
        });
    }
};

var getAllStudents = (req, res, next) => {
    Student.find((err, students) => {
        if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
        return res.status(201).json({ success: true, data: students });
    });
};

var getStudent = (req, res, next) => {
    var studentId = req.params.id;
    if (!studentId) return res.status(201).json({success: false, message: 'Incomplete or invalid information.'});
    Student.findById(studentId, (err, student) => {
        if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
        if (student) return res.status(201).json({ success: true, data: student });
        else return res.status(201).json({ success: false, message: 'Invalid Student Information' });
    });
};

var updateStudent = (req, res, next) => {
    var studentName = req.body.studentName,
        studentRoll = req.body.studentRoll,
        studentEmail = req.body.studentEmail,
        isVoteAvailable = req.body.isVoteAvailable,
        isApproved = req.body.isApproved,
        studentId = req.params.id;

    if (!studentName || !studentRoll || !studentEmail || !studentId)
        return res.status(201).json({success: false, message: 'Incomplete or invalid information.'});

    Student.findById(studentId, (err, student) => {
        if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
        if (student) {
            student.studentName = studentName;
            student.studentRoll = studentRoll;
            student.studentEmail = studentEmail;
            student.isVoteAvailable = isVoteAvailable;
            student.isApproved = isApproved;
            student.save((err, student) => {
                if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
                return res.status(201).json({ success: true, data: student });
            });
        }
        else return res.status(201).json({ success: false, message: 'Invalid Student Information' });
    });
};

var deleteStudent = (req, res, next) => {
    var studentId = req.params.id;
    if (!studentId) return res.status(201).json({success: false, message: 'Incomplete or invalid information.'});
    Student.findByIdAndRemove(studentId, (err) => {
        if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
        else return res.status(201).json({ success: true, message: 'Successfully remove the student information.' });
    });
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
};