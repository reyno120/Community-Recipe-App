const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');
const Recipe = require('../models/Recipe');
const { cloudinary_key, cloudinary_secret, cloudinary_name } = require('../config/keys');
const cloudinary = require('cloudinary').v2;

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        cloudinary.config({
            cloud_name: cloudinary_name,
            api_key: cloudinary_key,
            api_secret: cloudinary_secret
        });

        Recipe.find({recipeID: req.body.recipeID}, (error, recipe) => {
            if(error) {
                console.log(error);
            }
            else {
                if(recipe[0].author === decoded.user.username) {
                    Recipe.deleteOne({recipeID: req.body.recipeID}, (error, response) => {
                        if(error) {
                            console.log(error);
                        }
                        else {
                            var filename = 'recipes/' + recipe[0].image.split("/").pop().split(".")[0];
                            cloudinary.uploader.destroy(filename, {invalidate: true}, (error, result) => {
                                if(error) {
                                    console.log(error);
                                }
                                else {
                                    res.send();
                                }
                            });
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