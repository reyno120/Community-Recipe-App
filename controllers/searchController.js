const Recipe = require('../models/Recipe');

module.exports = (req, res) => {
    if(req.query.search === '') {
      Recipe.find({}, (error, recipes) => {
        if(error) {
          console.log(error);
        }
        else {
          res.json({recipes: recipes});
        }
      });
    }
    else {
      const agg = [
        {
          '$search': {
            'text': {
              'query': req.query.search, 
              'path': 'name',
              'fuzzy': {
                  'maxEdits': 2,
                  'maxExpansions': 100
              }
            }
          }
        }
      ];

    Recipe.aggregate(agg, (error, recipes) => {
        if(error) {
            console.log(error);
        }
        else {
            res.json({recipes: recipes});
        }
    });
  }
}