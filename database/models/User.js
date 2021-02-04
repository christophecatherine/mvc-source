// Appel bcrypt
const bcrypt = require('bcrypt')

// Appel de mongoose 
const mongoose = require('mongoose')

//Creer un nouvel article dans schema 
const UserSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String

})

//securiser avec le middleware
UserSchema.pre('save', function(next) {

    //constante this pour recuperer user schema 
    const user = this

    //module de cryptage
    bcrypt.hash(user.password, 10, (error, encrypted) => {

        user.password = encrypted
        next()
    })

})


// export de notre model 

module.exports = mongoose.model('User', UserSchema)