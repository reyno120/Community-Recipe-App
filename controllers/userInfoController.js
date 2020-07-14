const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        User.findOne({username: decoded.user.username}, (error, user) => {
            res.json({image: user.image});
        });
    })
}