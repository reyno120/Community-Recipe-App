// Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const keys = require('./config/keys');
const expressSession = require('express-session');



// Controllers
const homeController = require('./controllers/homeController');
const recipeController = require('./controllers/recipeController');
const uploadImageController = require('./controllers/uploadImageController');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');



// Connection to database
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});



// Middleware
const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession ({
    secret: 'plants',
    resave: true,       // maybe should look these up later
    saveUninitialized: true,
    path: '/home'
}))
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);




// HTTP Request
app.get('/home', homeController);
app.get('/recipes', recipeController);
app.get('/login', loginController);

app.post('/imageUpload', uploadImageController);
app.post('/register', registerController);



const port = process.env.PORT || 4200;
app.listen(port);