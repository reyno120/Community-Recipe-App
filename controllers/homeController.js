const Recipes = require('../models/Recipe');
// const { v4: uuidv4 } = require('uuid');

// Recipes.create({
//     name: "test recipe 1",
//     description: "test desc 1",
//     author: "test author 1",
//     source: "test source 1",
//     directions: "test directions 1",
//     ingredients: "test ingredients 1",
//     date: "test date 1",
//     recipeID: uuidv4()
// },
// (error, event) => {
//     if(error) throw error;
// });

// Recipes.create({
//     name: "test recipe 2",
//     description: "test desc 2",
//     author: "test author 2",
//     source: "test source 2",
//     directions: "test directions 2",
//     ingredients: "test ingredients 2",
//     date: "test date 2",
//     recipeID: uuidv4()
// },
// (error, event) => {
//     if(error) throw error;
// });

// Recipes.create({
//     name: "test recipe 3",
//     description: "test desc 3",
//     author: "test author 3",
//     source: "test source 3",
//     directions: "test directions 3",
//     ingredients: "test ingredients 3",
//     date: "test date 3",
//     recipeID: uuidv4()
// },
// (error, event) => {
//     if(error) throw error;
// });

// Recipes.create({
//     name: "test recipe 4",
//     description: "test desc 4",
//     author: "test author 4",
//     source: "test source 4",
//     directions: "test directions 4",
//     ingredients: "test ingredients 4",
//     date: "test date 4",
//     recipeID: uuidv4()
// },
// (error, event) => {
//     if(error) throw error;
// });

module.exports = (req, res) => {
    Recipes.find({}, (error, recipes) => {
        if (error) throw error;
        // console.log(req.query);
        res.json({recipes: recipes});
    });
}

