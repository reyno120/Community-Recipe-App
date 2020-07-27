const User = require('../models/User');

module.exports = (req, res) => {
    User.find({username: req.query.username}, (error, user) => {
        if (error) {
            console.log(error);
        }
        else {
            res.json({user: user});
        }
    });
}