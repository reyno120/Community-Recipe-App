const path = require('path');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const { jwtKey, cloudinary_key, cloudinary_secret, cloudinary_name } = require('../config/keys');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

function createRecipe(req, res, imageURL, author) {
    User.find({username: author}, (error, user) => {
        if(error) {
            console.log(error);
        }
        else {
            Recipe.create({
                name: req.body.name,
                description: req.body.description,
                author: author,
                authorImage: user[0].image,
                contributors: req.body.contributors,
                source: req.body.source,
                directions: req.body.directions,
                ingredients: req.body.ingredients,
                allergens: req.body.allergens,
                amounts: req.body.amounts,
                tips: req.body.tips,
                nutrition: {
                    calories: req.body.calories,
                    carbs: req.body.carbs,
                    fat: req.body.fat,
                    protein: req.body.protein
                },
                time: req.body.time,
                difficulty: req.body.difficulty,
                image: imageURL,
                likes: 0,
                likedBy: [''],
                recipeID: uuidv4(),
                created: req.body.created
            },
            (error, recipe) => {
                if(error) {
                    console.log(error);
                }
                else {
                    res.send();
                }
            });
        }
    })
}


function updateRecipe(req, res, imageURL) {
    Recipe.updateOne({recipeID: req.body.recipeID}, {
        name: req.body.name,
        description: req.body.description,
        contributors: req.body.contributors,
        source: req.body.source,
        directions: req.body.directions,
        ingredients: req.body.ingredients,
        allergens: req.body.allergens,
        amounts: req.body.amounts,
        tips: req.body.tips,
        nutrition: {
            calories: req.body.calories,
            carbs: req.body.carbs,
            fat: req.body.fat,
            protein: req.body.protein
        },
        time: req.body.time,
        difficulty: req.body.difficulty,
        image: imageURL,
    },
    (error, recipe) => {
        if(error) {
            console.log(error);
        }
        else {
            res.send();
        }
    })
}

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        cloudinary.config({
            cloud_name: cloudinary_name,
            api_key: cloudinary_key,
            api_secret: cloudinary_secret
        });

        if(error) {
            res.status(403).json({expired: true});
        }
        else {
            if((req.body.author !== decoded.user.username) && (req.body.update)) {
                console.log("Token does not match recipe author");
                res.status(403);
            }
            else {
                if(req.files !== null) {
                    const file = req.files.file;
                    // const directory = path.join(__dirname, '../client/public/images/', file.name);
                    const directory = path.join(__dirname, '../images/', file.name);

                    file.mv(directory, error => {
                        if(error) {
                            console.error(error);
                            return res.status(500).send(error);
                        }

                        cloudinary.uploader.upload(directory, {
                            folder: 'recipes', 
                            use_filename: true
                        }, 
                        (error, result) => {
                            if(error) {
                                console.log(error);
                            }
                            else {
                                if(req.body.update) {
                                    // delete old image
                                    var filename = 'recipes/' + req.body.oldImage.split("/").pop().split(".")[0];
                                    cloudinary.uploader.destroy(filename, {invalidate: true}, (error, result2) => {
                                        if(error) {
                                            console.log(error);
                                        }
                                        else {
                                            updateRecipe(req, res, result.url);
                                        }
                                    });
                                }
                                else {
                                    createRecipe(req, res, result.url, decoded.user.username);
                                }
                            }
                        });
                
                    });
                }
                else { // if no new image was uploaded
                    if(req.body.update) {
                        updateRecipe(req, res, req.body.image);
                    }
                    else {
                        createRecipe(req, res, '', decoded.user.username);
                    }
                }
            }
        }
    });
}