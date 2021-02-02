// Appel de mongoose 
const mongoose = require('mongoose')

//Creer un nouvel article dans schema 
const ArticleSchema = new mongoose.Schema({

    title: String,
    content: String,
    author: String,
    image: String,
    createDate: {
        type: Date,
        default: new Date()
    }

})

// Creer un model dans article qui est associer a article schema
const Article = mongoose.model('Article', ArticleSchema)

// export de notre model 

module.exports = Article