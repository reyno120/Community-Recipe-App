// Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');



// Controllers
const homeController = require('./controllers/homeController');
const recipeController = require('./controllers/recipeController');
const uploadImageController = require('./controllers/uploadImageController');



// Connection to database
const connection = require('./config/keys');
mongoose.connect(connection.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});



// Middleware
const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



// HTTP Request
app.get('/home', homeController);
app.get('/recipes', recipeController);

app.post('/imageUpload', uploadImageController);



const port = process.env.PORT || 4200;
app.listen(port);