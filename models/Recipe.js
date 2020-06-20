const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    author: { type: String },
    source: { type: String },
    directions: { type: String },
    ingredients: { type: String },
    date: { type: String },
    // userid: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
});

const Event = mongoose.model('Events', eventSchema);
module.exports = Event;