const path = require('path');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');

function createRecipe(req, res, fileName, author) {
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
                image: '/images/'+ fileName,
                likes: 0,
                likedBy: [''],
                recipeID: uuidv4(),
                created: req.body.created
            },
            (error, recipe) => {
                if(error) {
                    console.log(error);
                }
                res.send();
            });
        }
    })
}


function updateRecipe(req, res, fileName) {
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
        image: fileName,
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
                    var date = new Date();
                    req.files.file.name = date.getTime() + req.files.file.name; // add time stamp

                    const file = req.files.file;
                    var filename = file.name.replace(/ /g, "-");
                    const directory = path.join(__dirname, '../client/public/images/', filename);
                    console.log(directory);
            
                    file.mv(directory, error => {
                        if(error) {
                            console.error(error);
                            return res.status(500).send(error);
                        }
                
                        if(req.body.update) {
                            updateRecipe(req, res, '/images/'+ filename);
                        }
                        else {
                            createRecipe(req, res, filename, decoded.user.username);
                        }
                    });
                }
                else {
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