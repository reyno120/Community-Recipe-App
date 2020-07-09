const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        if(error) {
            res.status(403);
        }
        else {
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
    });
}