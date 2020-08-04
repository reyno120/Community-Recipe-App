const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    bugs: { type: String },
    featuresLiked: { type: String },
    featuresMissing: { type: String },
    improvements: { type: String },
    other: { type: String }
});

const Feedback = mongoose.model('Feedback', feedbackSchema, 'feedback');
module.exports = Feedback;