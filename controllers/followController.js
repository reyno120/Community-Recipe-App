const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/keys');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        if(req.body.action === 'follow') {
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
        }
        else if(req.body.action === 'unfollow') {
            User.updateOne({
                username: decoded.user.username
            },
            {
                $pull: {
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
                        $pull: {
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
        }
    });
}