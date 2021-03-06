// Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const keys = require('./config/keys');
const path = require('path');



// Controllers
const homeController = require('./controllers/homeController');
const recipeController = require('./controllers/recipeController');
const uploadRecipeController = require('./controllers/uploadRecipeController');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const authController = require('./controllers/authController');
const likeController = require('./controllers/likeController');
const editBookmarkController = require('./controllers/editBookmarkController');
const showBookmarksController = require('./controllers/showBookmarksController');
const updateProfileController = require('./controllers/updateProfileController');
const userInfoController = require('./controllers/userInfoController');
const commentController = require('./controllers/commentController');
const discoverController = require('./controllers/discoverController');
const usersController = require('./controllers/usersController');
const followController = require('./controllers/followController');
const myRecipesController = require('./controllers/myRecipesController');
const deleteRecipeController = require('./controllers/deleteRecipeController');
const feedbackController = require('./controllers/feedbackController');
const searchController = require('./controllers/searchController');



// Connection to database
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(error => {
        console.log("Error connecting to MongoDB");
        console.log(error);
    });



// Middleware
const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const verifyToken = require('./middleware/verifyToken');



// HTTP Request
app.get('/home', homeController);
app.get('/recipes', recipeController);
app.get('/user/auth', verifyToken, authController);
app.get('/user/info', verifyToken, userInfoController);
app.get('/users', usersController);
app.get('/myrecipes', verifyToken, myRecipesController);
app.get('/search', searchController);

app.post('/recipeUpload', verifyToken, uploadRecipeController);
app.post('/register', registerController);
app.post('/login', loginController);
app.post('/recipe/like', verifyToken, likeController);
app.post('/recipe/bookmark', verifyToken, editBookmarkController);
app.post('/user/bookmarks', verifyToken, showBookmarksController);
app.post('/user/update', verifyToken, updateProfileController);
app.post('/comments/get', commentController);
app.post('/comments/add', verifyToken, commentController);
app.post('/discover', discoverController);
app.post('/follow', verifyToken, followController);
app.post('/recipe/delete', verifyToken, deleteRecipeController);
app.post('/feedback', feedbackController);



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 4200;
app.listen(port);