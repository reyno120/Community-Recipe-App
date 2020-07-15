const User = require('../models/User');
const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    User.create({
        username: req.body.registerUser,
        password: req.body.registerPass,
        email: req.body.registerEmail,
        bookmarks: [],
        image: ''
    },
    (error, user) => {
        if(error) {
            console.log(error);
            res.json({userExists: true});
        }
        else {
            jwt.sign({user: user}, jwtKey, {expiresIn: '2h'}, (error, token) => {
                if(error) {
                    console.log(error);
                    res.json({userExists: true});
                }
                else {
                    res.json({token: token, userExists: false, username: user.username, bookmarks: user.bookmarks});
                }
            });    
        }
    });
}