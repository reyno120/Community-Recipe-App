const Recipes = require('../models/Recipe');

module.exports = (req, res) => {
    Recipes.find({recipeID: req.query.recipeID}, (error, recipe) => {
        if (error) throw error;
        res.json({recipe: recipe});
    });
}

