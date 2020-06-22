const Recipes = require('../models/Recipe');


module.exports = (req, res) => {
    Recipes.find({}, (error, recipes) => {
        if (error) throw error;
        console.log(req.query);
        res.json({recipes: recipes});
    });
}

