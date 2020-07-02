const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true
    }
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema);
module.exports = User;