const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    author: { type: String },
    source: { type: String },
    directions: [{ type: String }],
    ingredients: [{ type: String }],
    date: { type: String },
    tips: [{ type: String }],
    nutrition: {
        calories: { type: String},
        carbs: { type: String },
        fat: { type: String },
        protein: { type: String }
    },
    time: { type: String },
    difficulty: { type: String },
    recipeID: { type: String }
    // userid: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');
module.exports = Recipe;