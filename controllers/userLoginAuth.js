// requete de la variable bcrypt 
const bcrypt = require('bcrypt')


//requete de la variable user  vers notre base de donnée user
const user = require('../database/models/User')

//pour exporter notre module dans la base de donnée 
module.exports = (req, res) => {

    //const permet de recuperer email et mp dans le body
    const {
        email,
        password
    } = req.body;

    //allez chercher dans la base de donnée
    user.findOne({
        email

        //affiche error ou user 
    }, (error, user) => {
        if (user) {

            //cryptage pour comparer le mp avec la fnc error ou ok 
            bcrypt.compare(password, user.password, (error, same) => {

                    //si c ok redirection sur page home
                    if (same) {

                        //requete session assigne l'id a l'utilisateur
                        req.session.userId = user._id

                        res.redirect('/')
                            // sinon reste sur la page user login    
                    } else {
                        res.redirect('/user/login')
                    }

                })
                // sinon reste sur la page user login  
        } else {
            return res.redirect('/user/login')
        }

    })
}