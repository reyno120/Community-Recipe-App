const Recipes = require('../models/Recipe');

module.exports = (req, res) => {
    if (req.query.filter === 'Most Popular') {
        Recipes.find({})
        .sort({'likes': -1})
        .exec(function (error, recipes) {
            if (error) throw error;

            var filteredRecipes = [];
            for(var i = 0; i < 4; i++) {
                filteredRecipes.push(recipes[i]);
            }
            res.json({recipes: filteredRecipes});
        });
    }
    else if (req.query.filter === 'New this week!') {
        Recipes.find({}, (error, recipes) => {
            if (error) throw error;
        
            var filteredRecipes = [];
            for(var i = (recipes.length - 1); i > (recipes.length - 5); i--) {
                filteredRecipes.push(recipes[i]);
            }
        
            res.json({recipes: filteredRecipes});
        });
    }
}