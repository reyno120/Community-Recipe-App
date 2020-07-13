const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        if(error) {
            res.status(403);
        }
        else {
            if(req.body.action === 'add') {
                User.updateOne({
                    username: decoded.user.username
                },
                {
                    $push: {
                        bookmarks: req.body.recipeID
                    }
                }, 
                (error, user) => {
                    if(error) {
                        console.log(error);
                    };
                    res.send();
                });
            }
            else if(req.body.action === 'remove') {
                User.updateOne({
                    username: decoded.user.username
                },
                {
                    bookmarks: req.body.bookmarks
                }, 
                (error, user) => {
                    if(error) {
                        console.log(error);
                    };
                    res.send();
                });
            }
            // else if(req.body.action === 'display') {
            //     User.find({
            //         username: decoded.user.username,
            //         bookmarks: {}
            //     },
            //     (error, user) => {
            //         if(error) {
            //             console.log(error);
            //         }
            //         res.send()
            //     });
            // }
        }
    });
}