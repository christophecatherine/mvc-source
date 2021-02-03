const Post = require("../database/models/Article")

module.exports = (req, res) => {
    res.render("article/add")
}