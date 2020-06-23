const Recipes = require('../models/Recipe');
// const { v4: uuidv4 } = require('uuid');
// const fileUpload = require('express-fileupload');
// const path = require('path');

// for(var i = 1; i < 5; i++) {
//     var image;
//     if(i == 1) {
//         image = 'anna-pelzer-unsplash.jpg';
//     }
//     else if(i == 2) {
//         image = 'edgar-castrejon-unsplash.jpg';
//     }
//     else if(i == 3) {
//         image = 'eaters-collective-unsplash.jpg';
//     }
//     else {
//         image = 'yoav-aziz-unsplash.jpg';
//     }
//     Recipes.create({
//         name: "test recipe " + i,
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         author: "test author " + i,
//         source: "test source " + i,
//         directions: ["direction 1", "direction 2", "direction 3", "direction 4"],
//         ingredients: ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4"],
//         date: "test date " + i,
//         tips: ["useful tip 1", "useful tip 2", "useful tip 3"],
//         nutrition: {
//             calories: '500',
//             carbs: '100g',
//             fat: '5g',
//             protein: '12g'
//         },
//         time: '30 minutes',
//         difficulty: 'easy',
//         image: '/images/' + image,
//         recipeID: uuidv4()
//     },
//     (error, event) => {
//         if(error) throw error;
//     });
// }

module.exports = (req, res) => {
    Recipes.find({}, (error, recipes) => {
        if (error) throw error;
        // console.log(req.query);
        res.json({recipes: recipes});
    });
}

