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


//Post
// creer une variable Post qui renvoie vers Article
const Post = require("./database/models/Article")

// Notre app utile express static pour les dossier 'public'
app.use(express.static('public'));

//Route 
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//demande vers index et la syncroniser
app.get("/", async(req, res) => {

    const posts = await Post.find({}).lean()

    res.render("index", {
        posts
    })
})

//demande vers contact  
app.get("/contact", (req, res) => {
    res.render("contact")
})

// Aticles //

//renvoie vers articles plus id et synchroniser
app.get("/articles/:id", async(req, res) => {
    console.log(req.params.id);
    // 
    const article = await Post.findById(req.params.id).lean()
    console.log(article);
    //renvoie de la view articles avec les data article
    res.render("articles", {
        article
    })
})

//renvoie vers articles add
app.get("/article/add", (req, res) => {
    res.render("article/add")
})




//poster un article
app.post("/articles/post", (req, res) => {

    //envoie le dossier image {destructuration de l'image} dans le dossier article 
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
app.listen(3000, function() {
    console.log("Le serveur tourne sur le port 3000");

})