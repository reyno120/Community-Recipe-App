const { jwtKey, cloudinary_key, cloudinary_secret, cloudinary_name } = require('../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const path = require('path');
const cloudinary = require('cloudinary').v2;

function updateUser(req, res, filename, username) {
    User.findOneAndUpdate({
        username: username
    }, 
    {
        image: filename
    },
    (error, user) => {
        if(error) {
            console.log(error);
        }
        else {
            Recipe.updateMany({
                author: username
            },
            {
                authorImage: filename
            },
            (error, recipe) => {
                if(error) {
                    console.log(error);
                }
                res.send();
            });
        }
    });
}

module.exports = (req, res) => {
    jwt.verify(req.token, jwtKey, (error, decoded) => {
        cloudinary.config({
            cloud_name: cloudinary_name,
            api_key: cloudinary_key,
            api_secret: cloudinary_secret
        });

        if(error) {
            res.status(403);
        }
        else if(req.files !== null) {
            const file = req.files.file;
            const directory = path.join(__dirname, '../images/', file.name);
            var filename = 'users/' + req.body.oldImage.split("/").pop().split(".")[0];

            file.mv(directory, error => {
                if(error) {
                    console.error(error);
                    return res.status(500).send(error);
                }

                cloudinary.uploader.upload(directory, {
                    folder: 'users',
                    use_filename: true
                }, 
                (error, result) => {
                    if(error) {
                        console.log(error);
                    }
                    else {
                        // delete old image
                        cloudinary.uploader.destroy(filename, {
                            invalidate: true
                        },
                        (error, result2) => {
                            if(error) {
                                console.log(error);
                            }
                            else {
                                updateUser(req, res, result.url, decoded.user.username);
                            }
                        });
                    }
                });
            });
        }   
        else {
            //update other profile items
            //use similar structure to uploadRecipeController
        }
    });
}