const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    author: { type: String },
    authorImage: { type: String },
    contributors: [{ type: String }],
    source: { type: String },
    directions: [{ type: String }],
    ingredients: [{ type: String }],
    allergens: [{ type: String }],
    amounts: [{ type: String }],
    tips: [{ type: String }],
    nutrition: {
        calories: { type: String},
        carbs: { type: String },
        fat: { type: String },
        protein: { type: String }
    },
    time: { type: String },
    difficulty: { type: String },
    image: { type: String },
    likes: { type: Number },
    likedBy: [{ type: String }],
    comments: [{
        author: { type: String },
        comment: { type: String }
    }],
    recipeID: { type: String },
    created: { type: String }
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');
module.exports = Recipe;