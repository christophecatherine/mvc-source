// Appel de mongoose 
const mongoose = require('mongoose')

//Creer un nouvel article dans schema 
const ArticleSchema = new mongoose.Schema ({

    title: String,
    intro: String,
    content: String,

})

// Creer un model deans article qui est associer a article schema
const Article = mongoose.model('Article', ArticleSchema)

// export de notre model 

module.exports = Article