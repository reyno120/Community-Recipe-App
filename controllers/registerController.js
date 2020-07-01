const User = require('../models/User');

module.exports = (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
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