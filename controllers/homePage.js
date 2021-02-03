//Post
// creer une variable Post qui renvoie vers Article


const Post = require("../database/models/Article")

module.exports = async (req, res) => {

    const posts = await Post.find({}).lean()

    res.render("index", {
        posts
    })
}