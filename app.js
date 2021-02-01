// Allez chercher express 
const express = require('express')
const exphbs = require('express-handlebars');

// Allez chercher Mongoose
const mongoose = require('mongoose');

//Allez chercher body-parser
const bodyParser = require('body-parser');


// Notre app va chercher express
const app = express();

// Notre app utile body-parser.json
app.use(bodyParser.json())

// Notre app utilise pour un résulta "vrai"
app.use(bodyParser.urlencoded({ extended: true }))


//Connect mongoose a base de donnee
mongoose.connect('mongodb://localhost:27017/blog-test', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

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
app.get("/", async (req, res) => {

    const posts = await Post.find({}).lean()


    res.render("index", { posts })
})

//demande vers contact  
app.get("/contact", (req, res) => {
    res.render("contact")
})

// Aticles //
//renvoie vers articles add
app.get("/articles/add", (req, res) => {
    res.render("articles/add")
})




//poster un article
app.post("/articles/post", (req, res) => {

    Post.create(req.body, (error, post) => {
        res.redirect('/')
    })

    console.log(req.body);

})






//ecoute vers le port 3000
app.listen(3000, function () {
    console.log("Le serveur tourne sur le port 3000");

})