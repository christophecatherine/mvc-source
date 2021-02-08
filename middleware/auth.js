const User = require('../database/models/User')

module.exports = (req, res, next) => {

    // Connecte toi dans la base de donnée
    console.log('Midleware auth')

    User.findById(req.session.userId, (error, user) => {

        if (error || !user) {
            return res.redirect('/')

        }

        next()
    })



    // Verifie le user

    //Si il est dans la base de donnée 


    // Sinon tu le rediriges


}