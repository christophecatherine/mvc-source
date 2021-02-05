//Post
//requete de la variable Post vers notre base de donnée Article
const Post = require("../database/models/Article")


/*pour exporter notre module dans la base de donnée et 
synchronise la requete et la reponse */
module.exports = async(req, res) => {

    // variable posts attend de trouver 
    const posts = await Post.find({}).lean()

    console.log(req.session);

    // reponse vers l'index
    res.render("index", {
            posts
        }

    )
}