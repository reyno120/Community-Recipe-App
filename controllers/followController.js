const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/keys');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        console.log(decoded);
        User.updateOne({
            username: decoded.user.username
        },
        {
            $push: {
                following: req.body.userProfile
            }
        },
        (error, user) => {
            if(error) {
                console.log(error);
            }
            else {
                User.updateOne({
                    username: req.body.userProfile
                },
                {
                    $push: {
                        followers: decoded.user.username
                    } 
                },
                (error, user) => {
                    if(error) {
                        console.log(error);
                    }
                });
            }
        });
    });
}