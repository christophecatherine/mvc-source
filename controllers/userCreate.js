//pour exporter notre module vers register
module.exports = (req, res) => {



    res.render("register", {
            erros : req.session.registerError

        }
    )
}