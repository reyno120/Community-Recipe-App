const Recipe = require('../models/Recipe');


module.exports = (req, res) => {
    const { ingredients, allergens, difficulty, time } = req.body;
    console.log(req.body);

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
    else if(ingredients.length == 0 && allergens.length > 0) {
        var filter = {
            allergens: {
                $all: allergens
            }
        };
    }


    Recipe.find(filter, (error, recipes) => {
        if(error) {
            console.log(error);
        }
        else {
            // filter out difficulty
            filteredRecipes = [];
            for (var i = 0; i < recipes.length; i++) {
                switch(difficulty) {
                    case 'Easy':
                        if(recipes[i].difficulty === 'Easy') {
                            filteredRecipes.push(recipes[i]);
                        }
                        break;

                    case 'Medium':
                        if(recipes[i].difficulty === 'Medium' || recipes[i].difficulty === 'Easy') {
                            filteredRecipes.push(recipes[i]);
                        }
                        break;
                    
                    case 'Hard':
                        filteredRecipes.push(recipes[i]);
                        break;

                    default:
                        filteredRecipes.push(recipes[i]);
                }
            }

            var timeFilteredRecipes = []
            if(time === 0 || time === '' || time === null) {
                timeFilteredRecipes = filteredRecipes;
            }
            else {
                for(i = 0; i < filteredRecipes.length; i++) {
                    if(filteredRecipes[i].time !== '' && filteredRecipes[i].time !== 0 && filteredRecipes[i].time !== null) {
                        if(filteredRecipes[i].time <= time) {
                            timeFilteredRecipes.push(filteredRecipes[i]);
                        }
                    }
                }
            }

            res.json({recipes: timeFilteredRecipes});
        }
    });
}