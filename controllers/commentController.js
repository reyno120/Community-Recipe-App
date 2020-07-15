const User = require('../models/User');

module.exports = (req, res) => {

    User.find({username: req.body.authors}, (error, users) => {
        if(error) {
            console.log(error);
        }
        else {
            var userImages = {};

            users.forEach(user => {
                userImages[user.username] = user.image;
            })

            res.json({userImages: userImages});
        }
    })
}