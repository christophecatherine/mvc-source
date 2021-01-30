// Appel de mongoose
const mongoose = require('mongoose')

// Appel de mon model
const  Article =require('./database/models/Article')

// Connect a ma base de donnée
mongoose.connect('mongodb://localhost:27017/blog-test');

//Affiche le contenue sous forme id de notre base de donnée 
Article.findById("601589e54f09281cbe03d75b", (error, articles) => {
    console.log(error, articles);
 })




/*
//Affiche le contenue de notre base de donnée
Article.find({

    // Affiche que lélément de cette article  
    intro: "test d'introduction",

}, (error, articles) => {
    console.log(error, articles);
})
*/



/*
//Creer mon article 
Article.create({
    title: "SpiderMan",
    intro: "test d'introduction",
    content: "Critique sur le film SpiderMan",
}, (error, post) => {
    console.log(error, post);
}

)
*/