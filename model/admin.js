var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

const AdminSchema = new Schema({
    adminUsername: { type: String, required: true },
    adminEmail: { type: String, required: true },
    adminPassword: { type: String, required: true }
});

// Pre-save of user's hash adminPassword to database
AdminSchema.pre('save', function (next) {
    const users = this,
        SALT_FACTOR = 5;

    if (!users.isModified('adminPassword')) return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(users.adminPassword, salt, null, (err, hash) => {
            if (err) return next(err);
            users.adminPassword = hash;
            next();
        });
    });
});

// Method to compare adminPassword for login
AdminSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.adminPassword, (err, isMatch) => {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Admin', AdminSchema, 'Admin');

