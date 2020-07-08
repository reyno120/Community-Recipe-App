const keys = require('../config/keys');
const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        if(error) {
            // console.log(error);
            res.json({expired: true});
        }
        else {
            res.json({expired: false});
        }
    });
}