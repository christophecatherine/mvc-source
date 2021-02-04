// Allez chercher express 
const express = require('express')
const exphbs = require('express-handlebars');

// Allez chercher Mongoose
const mongoose = require('mongoose');

//Allez chercher body-parser
const bodyParser = require('body-parser');

// Notre app va chercher fileupload
const fileUpload = require("express-fileupload");

// Notre app va chercher express
const app = express();



//Controller //
//article
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/articleAdd')
const articlePostController = require('./controllers/articlePost')
const homePage = require('./controllers/homePage')


//User
//creation d'un utilisateur
const userCreate = require('./controllers/userCreate')

//enregistre un utilisateur
const userRegister = require('./controllers/userRegister')


// Notre app utile fileupload
app.use(fileUpload());

// Notre app utile body-parser.json
app.use(bodyParser.json());

// Notre app utilise pour un résulta "vrai"
app.use(bodyParser.urlencoded({
    extended: true
}));


//Connect mongoose a base de donnee
mongoose.connect('mongodb://localhost:27017/blog-test', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

//Creation de la date avec la fonction moment
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);




// Notre app utile express static pour les dossier 'public'
app.use(express.static('public'));

//Route 
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//Middleware

//Requete de Middlware si tu trouves pas le fichier tu continue vers la page 
const articleValidPost = require('./middleware/articleValidPost')

//demande si tu vois cette variable tu applique middleware
app.use("/articles/post", articleValidPost)



//demande vers la page home
app.get("/", homePage)



// Aticles //
//renvoie vers articles add
app.get("/articles/add", articleAddController)


//renvoie vers articles plus id 
app.get("/articles/:id", articleSingleController)


//renvoie vers articles post
app.post("/articles/post", articlePostController)

//Users
app.get("/user/create", userCreate)
app.post('/User/register', userRegister)

//Contact

//demande vers contact  
app.get("/contact", (req, res) => {
    res.render("contact")
})


//ecoute vers le port 3000
app.listen(3000, () => {
    console.log(`Le serveur tourne sur le port 3000`);

})