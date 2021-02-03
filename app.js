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

// Notre app va chercher 'path'
const path = require('path');

//Controller 
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/createArticle')
const homePage = require('./controllers/homePage')


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

//Requete de Middlware si tu trouves pas le fichier tu continue vers la page 

const middleware = (req, res, next) => {

    if (!req.files) {
        return res.redirect('/')
    }
    console.log("Je suis le Middleware");
    next()
}

//demande si tu vois cette variable tu applique middleware

app.use("/articles/post", middleware)



//demande vers la page home
app.get("/", homePage)

//demande vers contact  
app.get("/contact", (req, res) => {
    res.render("contact")
})

// Aticles //


//renvoie vers articles add
app.get("/articles/add", articleAddController)


//renvoie vers articles plus id et synchroniser
app.get("/articles/:id", articleSingleController)


//poster un article
app.post("/articles/post", (req, res) => {


    const {
        image
    } = req.files

    // envoie du fichier image dans articles 
    const uploadFile = path.resolve(__dirname, 'public/articles', image.name)

    //deplacement du fichier image 
    image.mv(uploadFile, (error) => {
        Post.create({
            ...req.body,
            image: `/articles/${image.name}`
        }, (error, post) => {
            res.redirect('/')
        })
    })
})

//ecoute vers le port 3000
app.listen(3000, () => {
    console.log(`Le serveur tourne sur le port 3000`);

})