const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');
const Recipe = require('../models/Recipe');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        if(error) {
            res.status(403);
        }
        else {
            Recipe.updateOne({
                recipeID: req.body.recipeID
            },
            {
                likedBy: req.body.likedBy,
                likes: req.body.likes
            }, 
            (error, recipe) => {
                if(error) throw error;
                res.send();
            });
        }
    });
}