const User = require('../models/User');

module.exports = (req, res) => {
    User.create({
        username: req.body.registerUser,
        password: req.body.registerPass,
        email: req.body.registerEmail
    },
    (error, user) => {
        if(error) {
            console.log(error);
        }
        else {
            req.session.userId = user._id;
        }
    });
}