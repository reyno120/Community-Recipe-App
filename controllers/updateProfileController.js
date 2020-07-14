const { jwtKey } = require('../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const path = require('path');

function updateUser(req, res, filename, username) {
    User.findOneAndUpdate({
        username: username
    }, 
    {
        image: '/images/'+ filename
    },
    (error, user) => {
        if(error) {
            console.log(error);
        }
        else {
            res.send();
        }
    });
}

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        if(error) {
            res.status(403);
        }
        else if(req.files !== null) {
            var date = new Date();
            req.files.file.name = date.getTime() + req.files.file.name; // add time stamp

            const file = req.files.file;
            const directory = path.join(__dirname, '../client/public/images/', file.name);

            file.mv(directory, error => {
                if(error) {
                    console.error(error);
                    return res.status(500).send(error);
                }

                updateUser(req, res, file.name, decoded.user.username);
            });
        }   
        else {
            //update other profile items
            //use similar structure to uploadRecipeController
        }
    });
}