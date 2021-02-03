const Post = require("../database/models/Article")

module.exports = async (req, res) => {

    const article = await Post.findById(req.params.id).lean()

    //renvoie de la view articles avec les data article
    res.render("articles", {
        article
    })
}