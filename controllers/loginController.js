const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({username: username}, (error, user) => {
        if(error) throw error;  // need to do proper error handling
        if(user) {
            bcrypt.compare(password, user.password, (error, match) => {
                if(match) {
                    jwt.sign({user: user}, keys.jwtKey, {expiresIn: '3h'}, (error, token) => {
                        if(error) {
                            console.log(error);
                        }
                        res.json({token: token, username: user.username, bookmarks: user.bookmarks});
                    });
                }
                else {
                    console.log("passwords don't match");
                    res.send();
                }
            });
        }
        else {  // no user found
            console.log("no user found");
            res.send();
        }
    });
}