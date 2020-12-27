# Community-Recipe-App
A Community based collaborative recipe web application for vegan healthy plant-based recipes

# Getting Started
## Requirements
* MongoDB Atlas
* Cloudinary Account

## Installing
### Setting up Config
1. Create a config folder in the home directory (same directory as the 'client' folder)
2. In the 'config' folder create a file named 'keys.js'
3. In 'keys.js' copy and paste the following:
```
module.exports = {
    mongoURI: 'xxxxxxxxxx',
    jwtKey: 'xxxxx',
    cloudinary_name: 'xxxxxxx',
    cloudinary_key: 'xxxxxxx',
    cloudinary_secret: 'xxxxxxxxxxx'
}
```

| Field | Description |
| ----- | ----------- |
| mongoURI | Your mongoURI from MongoDB Atlas to save and delete recipes and users |
| jwtKey | Secret key for jwt authentication, this can be anything |
| cloudinary_name | Taken from cloudinary for uploading and deleting recipe images |
| cloudinary_key | Taken from cloudinary for uploading and deleting recipe images |
| cloudinary_secret | Taken from cloudinary for uploading and deleting recipe images |

### Running


# Deployment
This project has been deployed through heroku and can be viewed here: https://community-recipe-app.herokuapp.com/

# Tech Stack
* React
* NodeJS/Express
* MongoDB

# Authors
* Jacob Reynolds

# License
This project is licensed under the MIT License
