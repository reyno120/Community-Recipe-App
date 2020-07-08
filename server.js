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



// Connection to database
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});



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

app.post('/recipeUpload', verifyToken, uploadRecipeController);
app.post('/register', registerController);
app.post('/login', loginController);



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 4200;
app.listen(port);