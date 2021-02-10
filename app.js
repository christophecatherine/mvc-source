// Allez chercher express 
const express = require('express')
const exphbs = require('express-handlebars');

// Allez chercher Mongoose
const mongoose = require('mongoose');

//Notre app va chercher connect-mongo
const MongoStore = require('connect-mongo');

//Notre app va chercher connect-flash
const connectFlash = require('connect-flash')

//Notre app va chercher stripTags
const {
    stripTags
} = require('./helpers/hbs')


//Allez chercher body-parser
const bodyParser = require('body-parser');

// Notre app va chercher fileupload
const fileUpload = require("express-fileupload");

// notre app va chercher express-session
const expressSession = require('express-session');



//Controller //
//article
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/articleAdd')
const articlePostController = require('./controllers/articlePost')
const homePage = require('./controllers/homePage')




//User
//creation d'un utilisateur
const userCreate = require('./controllers/userCreate')

//enregistre un utilisateur
const userRegister = require('./controllers/userRegister')

// user login
const userLogin = require('./controllers/userLogin')

//user login authentification
const userLoginAuth = require('./controllers/userLoginAuth')

//user logout
const userLogout = require('./controllers/userLogout')

// Notre app va chercher express
const app = express();

require('dotenv').config()

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    //MongoDB connect a la base de donnée 
    .then(() => console.log('Connecter à MongoDB Cloud'))
    .catch(err => console.log(err));

const mongoStore = MongoStore(expressSession)

//Notre app utile connect-flash
app.use(connectFlash())

//Notre app utile expressSession
app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    //sauvagarde ce qui n'est pas initialise
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(

        {
            mongooseConnection: mongoose.connection
        }
    )
}))


// Notre app utile body-parser.json
app.use(bodyParser.json());

// Notre app utilise pour un résulta "vrai"
app.use(bodyParser.urlencoded({
    extended: true
}));

// Notre app utile fileupload
app.use(fileUpload());



//Appel de notre variable dans la base de donnée 
const auth = require("./middleware/auth")
const redirectAuthSuccess = require('./middleware/redirectAuthSucess')



//Creation de la date avec la fonction moment
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);




// Notre app utile express static pour les dossier 'public'
app.use(express.static('public'));

//Route 
app.engine('handlebars', exphbs({

    helpers: {
        stripTags: stripTags
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    console.log(res.locals.user);
    next()

})


//Middleware
//Requete de Middlware si tu trouves pas le fichier tu continue vers la page 
const articleValidPost = require('./middleware/articleValidPost')

//demande si tu vois cette variable tu applique middleware
app.use("/articles/post", articleValidPost)

//demande si tu vois cette variable tu applique middleware auth
app.use("/articles/add", auth)

//demande vers la page home
app.get("/", homePage)



// Aticles //
//renvoie vers articles add
app.get("/articles/add", auth, articleAddController)


//renvoie vers articles plus id 
app.get("/articles/:id", articleSingleController)


//renvoie vers articles post
app.post("/articles/post", auth, articleValidPost, articlePostController)




//Users
app.get('/user/create', redirectAuthSuccess, userCreate)
app.post('/user/register', redirectAuthSuccess, userRegister)
app.get('/user/login', redirectAuthSuccess, userLogin)
app.post('/user/loginAuth', redirectAuthSuccess, userLoginAuth)
app.get('/user/logout', userLogout)

//Contact

//demande vers contact  
app.get("/contact", (req, res) => {
    res.render("contact")
})

//Error 404
app.use((req, res) => {
    res.render('error404')
})


//ecoute vers le port 3000
app.listen(3000, () => {
    console.log(`Le serveur tourne sur le port 3000`);

})