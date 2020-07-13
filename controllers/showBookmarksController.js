const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');
const Recipe = require('../models/Recipe');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        if(error) {
            res.status(403);
        }
        else {
            Recipe.find({recipeID: req.body.bookmarks}, (error, recipes) => {
                if(error) {
                    console.log(error);
                }
                else {
                    res.json({recipes: recipes});
                }
            });
        }
    });
}