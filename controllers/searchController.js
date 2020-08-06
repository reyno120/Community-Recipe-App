const Recipe = require('../models/Recipe');

module.exports = (req, res) => {
    Recipe.find({
        $search: {
            text: {
                query: req.query.search,
                path: 'name'
            }
        }
    },
    (error, recipe) => {
        if(error) {
            console.log(error);
        }
        else {
            res.json({recipe: recipe});
        }
    })
}