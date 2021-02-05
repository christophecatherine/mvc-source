//requete de la variable post vers notre base de donnée Article
const Post = require("../database/models/Article")

//pour exporter notre module dans la base de donnée vers add
module.exports = (req, res) => {

    //si la requete session de l'id utilisateur alors renvoie vers article add
    if (req.session.userId) {
        return res.render("article/add")
    }

    res.redirect("/user/login")

}