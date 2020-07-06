const path = require('path');
const Recipe = require('../models/Recipe');
const { v4: uuidv4 } = require('uuid');
const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');

function createRecipe(req, res, fileName, author) {
    Recipe.create({
        name: req.body.name,
        description: req.body.description,
        author: author,
        contributors: req.body.contributors,
        directions: req.body.directions,
        ingredients: req.body.ingredients,
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
        image: '/images/' + fileName,
        recipeID: uuidv4(),
        created: req.body.created
    },
    (error, recipe) => {
        if(error) {
            console.log(error);
        }

        console.log(recipe);

        res.redirect('/');
    });
}

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        if(error) {
            res.status(403);
        }
        else {
            console.log(decoded);
            if(req.files !== null) {
                const file = req.files.file;
                const directory = path.join(__dirname, '../client/public/images/', file.name);
        
                file.mv(directory, error => {
                    if(error) {
                        console.error(error);
                        return res.status(500).send(error);
                    }
            
                    // var filePath = path.join('../../public/images', file.name);
                    createRecipe(req, res, file.name, decoded.user.username);
                });
            }
            else {
                createRecipe(req, res, '', decoded.user.username);
            }
        }
    });
}