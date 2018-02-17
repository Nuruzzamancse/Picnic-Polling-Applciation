var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

const StudentSchema = new Schema({
    studentName: { type: String, required: true },
    studentRoll: { type: Number, required: true },
    studentEmail: { type: String, required: true },
    isVoteAvailable: { type: Boolean, required: true, default: true },
    isApproved: { type: Boolean, required: true, default: false },
    studentPassword: { type: String, required: true }
});

// Pre-save of user's hash studentPassword to database
StudentSchema.pre('save', function (next) {
    const users = this,
        SALT_FACTOR = 5;

    if (!users.isModified('studentPassword')) return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(users.studentPassword, salt, null, (err, hash) => {
            if (err) return next(err);
            users.studentPassword = hash;
            next();
        });
    });
});

// Method to compare studentPassword for login
StudentSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.studentPassword, (err, isMatch) => {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Student', StudentSchema, 'Student');
