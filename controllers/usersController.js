const User = require('../models/User');
const Recipe = require('../models/Recipe');

module.exports = (req, res) => {
    User.find({username: req.query.username}, (error, user) => {
        if (error) {
            console.log(error);
        }
        else {
            if(user.length > 0) {
                Recipe.find({author: user[0].username}, (error, recipes) => {
                    if(error) {
                        console.log(error);
                        res.send();
                    }
                    else {
                        res.json({
                            followers: user[0].followers,
                            following: user[0].following,
                            image: user[0].image,
                            username: user[0].username,
                            recipes: recipes
                        });
                    }
                });
            }
            else {
                res.end();
            }
        }
    });
}