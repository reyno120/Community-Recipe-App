const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/keys');
const Recipe = require('../models/Recipe');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        if(error) {
            console.log(error);
        }
        else {
            Recipe.find({author: decoded.user.username}, (error, recipes) => {
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