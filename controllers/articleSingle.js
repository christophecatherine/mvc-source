//requete de la variable post vers notre base de donnée Article
const Post = require("../database/models/Article")


/*pour exporter notre module dans la base de donnée et 
synchronise la requete et la reponse */
module.exports = async(req, res) => {

    // variable posts attend de trouver 
    const article = await Post.findById(req.params.id).lean()

    //renvoie de la view articles avec les data article
    res.render('articles', {
        article
    })
}