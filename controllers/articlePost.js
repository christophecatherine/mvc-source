// Notre app va chercher 'path'
const path = require('path');
//requete de la variable post vers notre base de donnée Article
const Post = require("../database/models/Article")

//pour exporter notre module dans la base de donnée 
module.exports = (req, res) => {

    const {
        image
    } = req.files

    // envoie du fichier image dans articles 
    const uploadFile = path.resolve(__dirname, '..', 'public/articles', image.name)

    //deplacement du fichier image 
    image.mv(uploadFile, (error) => {
        Post.create({
            ...req.body,
            image: `/articles/${image.name}`
        }, (error, post) => {
            res.redirect('/')
        })
    })
}