// Allez chercher express 
const express = require('express')
const exphbs = require('express-handlebars');

// Allez chercher Mongoose
const mongoose = require('mongoose');


// Notre app va chercher express
const app = express();

//Connect mongoose a base de donnee
mongoose.connect('mongodb://localhost:27017/blog');

// Notre app utile express static pour les dossier 'public'
app.use(express.static('public'));

//Route 
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//demande vers index
app.get("/", function(req, res) {

    res.render("index")
})

//demande vers contact
app.get("/contact", function(req, res) {
    res.render("contact")
})

//ecoute vers le port 3000
app.listen(3000, function() {
    console.log("Le serveur tourne sur le port 3000");

})