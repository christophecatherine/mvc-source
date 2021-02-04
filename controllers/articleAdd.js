//requete de la variable post vers notre base de donnée Article
const Post = require("../database/models/Article")

L//pour exporter notre module dans la base de donnée vers add
module.exports = (req, res) => {
    res.render("article/add")
}