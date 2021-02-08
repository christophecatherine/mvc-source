const User = require('../database/models/User')

module.exports = (req, res, next) => {

    // Connecte toi dans la base de donnée article add

    if (req.session.userId) {
        return res.redirect('/articles/add')
    }

    next()


}