const Recipe = require('../models/Recipe');


module.exports = (req, res) => {
    const { ingredients, allergens, difficulty, time } = req.body;

    // ingredients and allergens filter applied
    if(ingredients.length > 0 && allergens.length > 0) {
        var filter = {
            ingredients: {
                $all: ingredients
            },
            allergens: {
                $all: allergens
            }
        };
    }
    // ingredients filter applied, no allergens filter
    else if(ingredients.length > 0 && allergens.length == 0) {
        var filter = {
            ingredients: {
                $all: ingredients
            }
        };
    }
    // allergens filter applied, no ingredients filter
    else if(ingredients.length < 0 && allergens.length > 0) {
        var filter = {
            allergens: {
                $all: allergens
            }
        };
    }
    // no allergens or ingredients filter
    // else {
    //     var filter = {
    //         difficulty: difficulty
    //     }
    // }


    Recipe.find(filter, (error, recipes) => {
        if(error) {
            console.log(error);
        }
        else {
            // filter out difficulty
            filteredRecipes = [];
            for (var i = 0; i < recipes.length; i++) {
                if(recipes[i].difficulty === difficulty) {
                    filteredRecipes.push(recipes[i]);
                }
            }

            res.json({recipes: filteredRecipes});
        }
    });
}