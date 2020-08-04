const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');
const Recipe = require('../models/Recipe');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        Recipe.find({recipeID: req.body.recipeID}, (error, recipe) => {
            if(error) {
                console.log(error);
            }
            else {
                if(recipe[0].author === decoded.user.username) {
                    Recipe.deleteOne({recipeID: req.body.recipeID}, (error, recipe) => {
                        if(error) {
                            console.log(error);
                        }
                        else {
                            res.send();
                        }
                    });
                }
                else {
                    console.log("Token does not match recipe author");
                    res.status(403);
                }
            }
        });
    });
}