const keys = require('../config/keys');
const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        if(error) {
            console.log(error);
            res.send();
        }
        else {
            console.log(decoded);
            res.json({loggedIn: true});
        }
    });
}