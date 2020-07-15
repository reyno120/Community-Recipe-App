const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/keys');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

module.exports = (req, res) => {
    if(req.body.action === 'get') {
        User.find({username: req.body.authors}, (error, users) => {
            if(error) {
                console.log(error);
            }
            else {
                var userImages = {};
    
                users.forEach(user => {
                    userImages[user.username] = user.image;
                })
    
                res.json({userImages: userImages});
            }
        });
    }
    else if(req.body.action === 'add') {
        jwt.verify(req.token, jwtKey, (error, decoded) => {
            if(error) {
                res.status(403);
            }
            else {
                Recipe.updateOne({
                    recipeID: req.body.recipeID
                }, 
                {
                    $push: {
                        comments: {
                            author: decoded.user.username,
                            comment: req.body.comment
                        }
                    }
                },
                (error, recipe) => {
                    if(error) {
                        console.log(error);
                    }
                    else {
                        res.json({newComment: req.body.comment, image: decoded.user.image});
                    }
                });
            }
        })
    }
}