//requete de la variable user vers notre base de donnée user
const User = require('../database/models/User')

//pour exporter notre module dans la base de donnée utile create fais une requete 
// avec une condition error et user et tu redirige vers la page home
module.exports = (req, res) => {
    User.create(
        req.body,
        (error, user) => {

            if (error) {


                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);

                req.flash('registerError', registerError)
                req.flash('data', req.body)


                return res.redirect('/user/create')
            }


            res.redirect('/')

        }
    )
}