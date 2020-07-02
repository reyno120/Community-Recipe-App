const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({username: username}, (error, user) => {
        if(error) throw error;  // need to do proper error handling
        if(user) {
            bcrypt.compare(password, user.password, (error, match) => {
                if(match) {
                    req.session.userId = user._id;
                    res.redirect('/home');
                }
            });
        }
    });
}